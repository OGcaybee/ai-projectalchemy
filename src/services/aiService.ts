
import { pipeline } from '@xenova/transformers';
import JSZip from 'jszip';

// Define types needed by other components
export interface ProjectRequirement {
  projectName: string;
  projectType: string;
  description: string;
  features: string[];
  techStack: string[];
  imageUrls: string[];
  themeColor: string;
}

export interface GeneratedProject {
  id: string;
  name: string;
  description: string;
  structure: {
    frontend: string[];
    backend?: string[];
  };
  techStack: string[];
  previewImageUrl?: string;
  codeSnippets: {
    frontend: string;
    backend?: string;
  };
}

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

// Implementation of the missing exported functions
export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
    try {
        // Create a prompt based on the requirements
        const prompt = `
            Create a ${requirements.projectType} web application named "${requirements.projectName}" 
            with the following description: ${requirements.description}.
            
            Features to include: ${requirements.features.join(', ')}.
            Tech stack: ${requirements.techStack.join(', ')}.
            
            Generate code for a modern responsive web application.
        `;
        
        // Generate the code
        const generatedCode = await CodeGeneratorService.generateCode(prompt);
        
        // Create a simple structure for the project
        const frontendFiles = [
            "index.html",
            "styles.css",
            "script.js",
            ...requirements.features.map(f => `components/${f.toLowerCase().replace(/\s+/g, '-')}.js`)
        ];
        
        // Return the generated project
        return {
            id: `proj-${Date.now()}`,
            name: requirements.projectName,
            description: requirements.description,
            structure: {
                frontend: frontendFiles,
                backend: requirements.techStack.includes("Node.js") ? ["server.js", "routes.js", "database.js"] : undefined
            },
            techStack: requirements.techStack,
            previewImageUrl: requirements.imageUrls.length > 0 ? requirements.imageUrls[0] : undefined,
            codeSnippets: {
                frontend: generatedCode,
                backend: requirements.techStack.includes("Node.js") ? `
                    const express = require('express');
                    const app = express();
                    const port = process.env.PORT || 3000;
                    
                    app.use(express.json());
                    
                    app.listen(port, () => {
                      console.log(\`Server running on port \${port}\`);
                    });
                ` : undefined
            }
        };
    } catch (error) {
        console.error("Error generating project:", error);
        throw new Error("Failed to generate project");
    }
};

export const downloadProject = async (project: GeneratedProject): Promise<string> => {
    try {
        // Create a new JSZip instance
        const zip = new JSZip();
        
        // Add frontend files to the zip
        project.structure.frontend.forEach(filePath => {
            if (filePath === "index.html") {
                zip.file(filePath, project.codeSnippets.frontend || `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${project.name}</title>
                        <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                        <h1>${project.name}</h1>
                        <p>${project.description}</p>
                        <script src="script.js"></script>
                    </body>
                    </html>
                `);
            } else if (filePath === "styles.css") {
                zip.file(filePath, `
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 1rem;
                    }
                    
                    h1 {
                        color: #4a5568;
                    }
                `);
            } else if (filePath === "script.js") {
                zip.file(filePath, `
                    document.addEventListener('DOMContentLoaded', function() {
                        console.log('${project.name} application loaded');
                    });
                `);
            } else if (filePath.startsWith("components/")) {
                // Add component files
                zip.file(filePath, `
                    // Component: ${filePath.replace('components/', '').replace('.js', '')}
                    function init() {
                        console.log('Component initialized');
                    }
                    
                    init();
                `);
            }
        });
        
        // Add backend files if they exist
        if (project.structure.backend && project.codeSnippets.backend) {
            project.structure.backend.forEach(filePath => {
                if (filePath === "server.js") {
                    zip.file(filePath, project.codeSnippets.backend);
                } else if (filePath === "routes.js") {
                    zip.file(filePath, `
                        // API Routes
                        const express = require('express');
                        const router = express.Router();
                        
                        router.get('/api/data', (req, res) => {
                            res.json({ message: 'API is working!' });
                        });
                        
                        module.exports = router;
                    `);
                } else if (filePath === "database.js") {
                    zip.file(filePath, `
                        // Database connection
                        console.log('Database connection initialized');
                        
                        module.exports = {
                            connect: () => {
                                console.log('Connected to database');
                            }
                        };
                    `);
                }
            });
        }
        
        // Add README.md
        zip.file("README.md", `
            # ${project.name}
            
            ${project.description}
            
            ## Tech Stack
            
            ${project.techStack.join(', ')}
            
            ## Getting Started
            
            1. Clone this repository
            2. Open index.html in your browser or set up a local server
            
            ## Features
            
            - ${project.structure.frontend
                .filter(f => f.startsWith("components/"))
                .map(f => f.replace('components/', '').replace('.js', '').replace(/-/g, ' '))
                .join('\n- ')}
        `);
        
        // Generate the zip file
        const blob = await zip.generateAsync({ type: 'blob' });
        
        // Return a URL for the blob
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error downloading project:", error);
        throw new Error("Failed to download project");
    }
};

export default CodeGeneratorService;
