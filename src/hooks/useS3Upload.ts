import { useState } from "react";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "#/enum";
import { fetchPresignedUrl } from "@/services/api.service";

type UploadStatus = "idle" | "preparing" | "uploading" | "success" | "error";

type UploadResult = {
	urls: string[];
};

export const useS3Upload = () => {
	const [status, setStatus] = useState<UploadStatus>("idle");
	const [progress, setProgress] = useState<number>(0);
	const [progressText, setProgressText] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const reset = () => {
		setStatus("idle");
		setProgress(0);
		setProgressText("");
		setError(null);
	};

	const validateFiles = (files: File[]) => {
		for (const file of files) {
			if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
				throw new Error(`${file.name} is not a supported image type`);
			}

			if (file.size > MAX_FILE_SIZE) {
				throw new Error(`${file.name} exceeds 50MB limit`);
			}
		}
	};

	const uploadFiles = async (files: File[]): Promise<UploadResult> => {
		try {
			reset();

			if (!files.length) {
				throw new Error("No files selected");
			}

			validateFiles(files);

			setStatus("preparing");
			setProgressText("Preparing secure upload...");

			const preparedFiles = await Promise.all(
				files.map(async (file) => {
					return {
						file,
						payload: {
							contentType: file.type,
							fileSize: file.size,
							fileName: file.name,
						} satisfies PresignedPayload,
					};
				}),
			);

			// Fetch all presigned URLs
			const presignedResponses = await Promise.all(
				preparedFiles.map(async ({ payload }) => {
					return fetchPresignedUrl([payload]);
				}),
			);

			setStatus("uploading");

			const uploadedUrls: string[] = [];

			for (let i = 0; i < preparedFiles.length; i++) {
				const current = preparedFiles[i];
				const presigned = presignedResponses[i].data;

				setProgressText(`Uploading ${i + 1} of ${preparedFiles.length}`);

				const uploadResponse = await fetch(presigned[i].uploadUrl, {
					method: "PUT",
					body: current.file,
				});

				if (!uploadResponse.ok) {
					throw new Error(`Failed to upload ${current.file.name}`);
				}

				uploadedUrls.push(presigned[i].publicUrl);

				setProgress(Math.round(((i + 1) / preparedFiles.length) * 100));
			}

			setStatus("success");
			setProgressText("Upload completed");

			return {
				urls: uploadedUrls,
			};
		} catch (err: unknown) {
			console.error("Presigned URL", err);

			const message = err instanceof Error ? err.message : "Upload failed";

			setStatus("error");
			setError(message);
			setProgressText("");

			throw err;
		}
	};

	return {
		uploadFiles,
		reset,
		status,
		progress,
		progressText,
		error,
	};
};
