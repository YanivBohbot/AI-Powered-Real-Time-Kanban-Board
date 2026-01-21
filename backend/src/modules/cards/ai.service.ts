import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { z } from 'zod';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private model: ChatOpenAI;

  constructor(private configService: ConfigService) {
    this.model = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'gpt-4o', // Ensure you have access, or use 'gpt-3.5-turbo'
      temperature: 0.7,
    });
  }

  // ---------------------------------------------------------
  // Feature 1: The Architect (Auto-generates Subtasks)
  // ---------------------------------------------------------
  async generateSubtasks(
    taskTitle: string,
    description: string,
  ): Promise<{ subtasks: string[]; summary: string }> {
    this.logger.log(`🧠 AI Architect: Analyzing task "${taskTitle}"...`);

    const subtaskSchema = z.object({
      subtasks: z
        .array(z.string())
        .describe('A list of 3-5 technical subtasks.'),
      summary: z
        .string()
        .describe('A 1-sentence technical summary of the task.'),
    });

    try {
      const structuredLlm = this.model.withStructuredOutput(subtaskSchema);

      const response = await structuredLlm.invoke([
        new SystemMessage(
          'You are a Senior Technical Lead. Break down features into actionable engineering tasks.',
        ),
        new HumanMessage(
          `Task: ${taskTitle}\nContext: ${description || 'No description provided'}`,
        ),
      ]);

      return response;
    } catch (error) {
      this.logger.error('AI Generation Failed', error);
      return { subtasks: [], summary: 'AI analysis failed.' };
    }
  }

  // ---------------------------------------------------------
  // Feature 2: The Consultant (Chat with your Board)
  // ---------------------------------------------------------
  async chatWithBoard(
    userMessage: string,
    boardContext: any[],
  ): Promise<string> {
    this.logger.log(`💬 AI Chat: answering "${userMessage}"`);

    const systemPrompt = `
      You are the Project Manager and Lead Developer for this project.
      You have real-time access to the board state below.
      
      Current Board Tasks:
      ${JSON.stringify(boardContext, null, 2)}
      
      Rules:
      1. Answer purely based on the tasks provided above.
      2. If the board is empty, guide the user to create their first task.
      3. Be professional, concise, and helpful.
      4. If asked about priorities, look for "High Priority" tags or "To Do" items.
    `;

    try {
      const response = await this.model.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userMessage),
      ]);

      return response.content as string;
    } catch (error) {
      this.logger.error('AI Chat Failed', error);
      return "I'm having trouble connecting to my brain right now. Please try again.";
    }
  }
}
