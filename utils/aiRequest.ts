//保存ai配置并封装相关方法
import OpenAI from "openai";
import config from "../config/aiConfig";

// ai 生图
async function generateImg(prompt: string): Promise<string> {
  const openai = new OpenAI(config);
  const res = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  return res.data[0].url!;
}

// 封装后的 ai 调用函数
//context 需要以固定格式作为参数，使用时可参见 https://platform.openai.com/docs/guides/text-generation/chat-completions-api
async function chat(
  context: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
): Promise<string> {
  const openai = new OpenAI(config);
  let res;
  res = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: context,
    n: 1,
  });
  return res.choices[0].message.content!;
}

// ai 翻译（如有需要）
async function translate(language: string, text: string) {
  const context = [
    {
      role: "system",
      content:
        "Now you are a translator, required to translate content as accurately as possible.",
    },
    {
      role: "user",
      content: `Please translate the following text into ${language}, and keep the format unchanged: ${text}`,
    },
    {
      role: "user",
      content: `Note: you should not provide any extra sentences or words other than translation results!`,
    },
  ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  return chat(context);
}
