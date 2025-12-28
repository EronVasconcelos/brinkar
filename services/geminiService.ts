import { GoogleGenAI, Type } from "@google/genai";
import { ActivityFormData, ActivityResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é o "Brinkar.IA", um assistente especializado em desenvolvimento infantil, pedagogia e criatividade.
Sua única função é gerar brincadeiras personalizadas, seguras e interativas.

LÓGICA DE CRIAÇÃO (ALGORITMO INTERNO):
1. Segurança: Nunca sugira atividades que ofereçam risco físico considerando o ambiente ou a idade.
2. Adaptação Etária: Se houver grande diferença de idade, crie regras assimétricas ou cooperativas.
3. Improvisação: Se "recursos" for limitado, use objetos do ambiente ou jogos verbais.
4. Clareza: Instruções simples para um adulto explicar em 30 segundos.
5. Diversão: Sugira atividades engajadoras e criativas baseadas nas tags fornecidas.

Responda SEMPRE em Português do Brasil.
`;

export const generateActivity = async (data: ActivityFormData): Promise<ActivityResponse> => {
  const prompt = `
    Crie uma brincadeira INCRÍVEL com os seguintes parâmetros:
    - Local/Ambiente: ${data.location}
    - Quantidade de Crianças: ${data.childCount}
    - Faixas Etárias: ${data.ageRanges.length > 0 ? data.ageRanges.join(', ') : 'Variadas'}
    - Recursos Disponíveis: ${data.resources.length > 0 ? data.resources.join(', ') : 'O que tiver por perto'}
    - Tempo de Duração: ${data.duration}
    - Nível de Energia Desejado: ${data.energyLevel === 'high' ? 'Agitar muito! (Gastar energia)' : data.energyLevel === 'medium' ? 'Moderado' : 'Acalmar (Foco e concentração)'}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Nome criativo e divertido da brincadeira" },
            objective: { type: Type.STRING, description: "Objetivo da brincadeira em 1 frase" },
            preparation: { type: Type.STRING, description: "O que precisa ser montado ou separado antes" },
            rules: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista ordenada de regras passo a passo"
            },
            adaptation: { type: Type.STRING, description: "Como adaptar para idades mistas ou dificuldades diferentes" },
            tip: { type: Type.STRING, description: "Dica pedagógica ou mágica para o adulto tornar tudo mais especial" }
          },
          required: ["title", "objective", "preparation", "rules", "adaptation", "tip"],
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No content generated");
    }

    return JSON.parse(jsonText) as ActivityResponse;
  } catch (error) {
    console.error("Error generating activity:", error);
    throw error;
  }
};