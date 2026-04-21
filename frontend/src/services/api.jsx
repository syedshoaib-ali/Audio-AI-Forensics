export async function analyzeAudio(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://audio-ai-forensics.onrender.com/analyze", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "API Error" };
  }
}