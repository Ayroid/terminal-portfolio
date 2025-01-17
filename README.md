# Terminal Portfolio

A unique, interactive terminal-style portfolio website built with Next.js. Experience my portfolio through a fully functional command-line interface with oh-my-zsh inspired styling.

## Features

- **Interactive Terminal Interface**: Navigate through my portfolio using familiar Linux commands
- **Oh-My-Zsh Style Prompt**: Beautiful two-line prompt with box-drawing characters
- **Neofetch-Style System Info**: Display system information in a visually appealing format
- **10 Beautiful Themes**: Choose from Catppuccin, Dracula, Nord, Gruvbox, and more
- **Virtual File System**: Browse through my projects, skills, and experience like a real filesystem
- **32 Linux Commands**: A comprehensive set of commands for exploring the portfolio

## Available Commands

### Navigation & File Operations
| Command | Description |
|---------|-------------|
| `ls` | List directory contents |
| `cd <path>` | Change directory |
| `pwd` | Print working directory |
| `cat <file>` | Display file contents |
| `tree` | Display directory tree |
| `find <pattern>` | Search for files |
| `head <file>` | Show first lines of a file |
| `tail <file>` | Show last lines of a file |
| `wc <file>` | Count lines, words, characters |

### File Management
| Command | Description |
|---------|-------------|
| `touch <file>` | Create a new file |
| `mkdir <dir>` | Create a directory |
| `rm <file>` | Remove a file |
| `cp <src> <dest>` | Copy files |
| `mv <src> <dest>` | Move/rename files |

### System Information
| Command | Description |
|---------|-------------|
| `neofetch` | Display system info with ASCII art |
| `uname` | Print system information |
| `hostname` | Show hostname |
| `uptime` | Show session uptime |
| `whoami` | Print current user |
| `date` | Show current date and time |

### Utilities
| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `clear` | Clear the terminal |
| `history` | Show command history |
| `echo <text>` | Print text to terminal |
| `alias` | Show defined aliases |
| `exit` | Close terminal session |
| `sudo` | Try to run as superuser |

### Social Links
| Command | Description |
|---------|-------------|
| `github` | Open my GitHub profile |
| `linkedin` | Open my LinkedIn profile |
| `hashnode` | Open my Hashnode blog |
| `x` | Open my X (Twitter) profile |
| `git` | View my GitHub contributions |

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Font**: [Hack](https://sourcefoundry.org/hack/) (monospace)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayroid/terminal-portfolio.git
cd terminal-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Themes

The terminal supports 10 beautiful color themes:

- **Catppuccin** (default) - A soothing pastel theme
- **Dracula** - A dark theme with vibrant colors
- **Nord** - An arctic, bluish color palette
- **Gruvbox** - Retro groove color scheme
- **One Dark** - Atom's iconic dark theme
- **Monokai** - Classic Sublime Text theme
- **Tokyo Night** - A clean dark theme
- **GitHub Dark** - GitHub's dark mode colors
- **Solarized Dark** - The popular Solarized palette
- **Material** - Material Design inspired colors

Toggle the theme picker using the palette icon in the bottom right corner.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Alt + /` | Toggle header visibility |

## Project Structure

```
terminal-portfolio/
├── app/                    # Next.js app router
├── components/
│   ├── commands/          # Command components (32 commands)
│   ├── terminal/          # Terminal UI components
│   └── ui/                # shadcn/ui components
├── data/                   # Constants and file system data
├── store/                  # Zustand state stores
├── themes/                 # Theme provider
└── types/                  # TypeScript types
```

## Deployment

Deploy easily on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ayroid/terminal-portfolio)

Or build for production:

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project as inspiration for your own portfolio!

## Author

**Ayroid** - [GitHub](https://github.com/ayroid) | [LinkedIn](https://linkedin.com/in/ayroid)

---

Type `help` in the terminal to explore all available commands!
