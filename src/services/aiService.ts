import { pipeline } from '@xenova/transformers';

class CodeGeneratorService {
    static generator = null;

    static async getInstance() {
        if (this.generator === null) {
            this.generator = pipeline(
                'text-generation',
                'facebook/bart-large-cnn'
            );
        }
        return this.generator;
    }

    static async generateCode(prompt: string): Promise<string> {
        try {
            const generator = await CodeGeneratorService.getInstance();
            const output = await generator(prompt, {
                max_length: 512,
                do_sample: true,
                temperature: 0.7,
                top_p: 0.95,
                num_return_sequences: 1,
            });
            return output[0].generated_text;
        } catch (error) {
            console.error("Error generating code:", error);
            throw error;
        }
    }
}

export default CodeGeneratorService;

