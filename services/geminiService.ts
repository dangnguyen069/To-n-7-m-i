import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  if (!ai) {
    return "Lỗi: Chưa cấu hình API Key. Vui lòng kiểm tra biến môi trường.";
  }

  try {
    const model = 'gemini-2.5-flash';
    // Instruction updated to enforce LaTeX formatting
    const systemInstruction = `Bạn là một gia sư Toán học thân thiện và kiên nhẫn dành cho học sinh lớp 7 tại Việt Nam.
    Bạn đang hỗ trợ học sinh học theo bộ sách giáo khoa "Chân trời sáng tạo".
    
    Quy tắc QUAN TRỌNG về định dạng toán học:
    1. Mọi công thức toán học, biến số (x, y), phân số, mũ, căn bậc hai... PHẢI được viết bằng định dạng LaTeX.
    2. Đặt công thức LaTeX bên trong cặp dấu $ (ví dụ: $x^2$, $\\frac{1}{2}$, $\\sqrt{25}$).
    3. KHÔNG dùng dấu ngoặc đơn kiểu \\( ... \\) hoặc code block. Chỉ dùng dấu $.
    4. Ví dụ: "Ta có phân số $\\frac{a}{b}$ với $b \\neq 0$."

    Hãy giải thích các khái niệm toán học một cách dễ hiểu, từng bước một.
    Nếu học sinh hỏi bài tập, đừng chỉ đưa ra đáp án, hãy hướng dẫn cách giải (phương pháp).
    Sử dụng tiếng Việt chuẩn mực, khích lệ học sinh.
    `;

    const chatSession = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history,
    });

    const result = await chatSession.sendMessage({
      message: message,
    });

    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.";
  }
};