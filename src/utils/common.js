import { customAlphabet } from "nanoid";

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    blue: '\x1b[34m',
    gray: '\x1b[90m',
  };
  
  export function consoleBox(message) {
      const lines = message.split('\n');
      const maxLength = Math.max(...lines.map(line => line.length));
      const border = '-'.repeat(maxLength + 4);
      console.log(border);
      for (const line of lines) {
          console.log(`| ${line.padEnd(maxLength)} |`);
      }
      console.log(border);
  };




export const generateId = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    10
);

export const generateUserId = () => `US${generateId()}`;

export const generateProjectId = () => `PO${generateId()}`;

export const generateTaskId = () => `TK${generateId()}`;

export const generateTenantId = () => `TN${generateId()}`;

