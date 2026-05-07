import { useState } from "react";

// Helper to generate SHA-256 hash of a file in the browser
const computeSHA256 = async (file: File): Promise<string> => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return btoa(String.fromCharCode(...hashArray));
};

type UploadStatus = "idle" | "preparing" | "uploading" | "success" | "error";

export const useS3Upload = () => {
	const [status, setStatus] = useState<UploadStatus>("idle");
	const [progressText, setProgressText] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const uploadFiles = async (files: File[]) => {
		setStatus("preparing");
		setError(null);
		setProgressText("Preparing files for secure upload...");

		try {
			// Generate checksums for all files
			const fileDataList = await Promise.all(
				files.map(async (file) => ({
					contentType: file.type,
					fileSize: file.size,
					fileName: file.name,
					checksum: await computeSHA256(file),
					originalFile: file,
				})),
			);

			// Get Presigned URLs
			setProgressText("Requesting secure upload links...");
			const presignResponse = await fetch("/api/upload/presign", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					// Send everything except the actual file
					items: fileDataList.map(({ originalFile, ...rest }) => rest),
				}),
			});

			if (!presignResponse.ok)
				throw new Error("Failed to get upload URLs from server");
			const { items: presignedUrls } = await presignResponse.json();

			// Upload each file directly to AWS S3 using the presigned URLs
			setStatus("uploading");
			setProgressText(`Uploading 0 of ${files.length} files...`);

			const uploadedPublicUrls: string[] = [];

			for (let i = 0; i < fileDataList.length; i++) {
				const file = fileDataList[i].originalFile;
				const uploadData = presignedUrls[i];

				const uploadResponse = await fetch(uploadData.uploadUrl, {
					method: "PUT",
					headers: {
						"Content-Type": file.type,
						"x-amz-checksum-sha256": fileDataList[i].checksum,
					},
					body: file,
				});

				if (!uploadResponse.ok)
					throw new Error(`Failed to upload ${file.name} to S3`);

				uploadedPublicUrls.push(uploadData.publicUrl);
				setProgressText(`Uploading ${i + 1} of ${files.length} files...`);
			}

			setStatus("success");
			setProgressText("All files uploaded successfully!");

			// Return the final URL
			return uploadedPublicUrls;
		} catch (err: unknown) {
			console.error(err);
			setStatus("error");
			const errorMessage =
				err instanceof Error
					? err.message
					: "An unknown error occurred during upload";
			setError(errorMessage);
			setProgressText("");
			throw err;
		}
	};

	return { uploadFiles, status, progressText, error };
};
