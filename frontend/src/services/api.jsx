export async function analyzeAudio(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "API Error" };
  }
}