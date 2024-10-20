export async function urlToFile(url: string, fileName: string, mimeType: string) {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], fileName, { type: mimeType });
  }