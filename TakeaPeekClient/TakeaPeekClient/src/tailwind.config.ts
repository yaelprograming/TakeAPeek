// import type { Config } from "tailwindcss";

// export default {
// 	darkMode: ["class"],
// 	content: [
// 		"./pages/**/*.{ts,tsx}",
// 		"./components/**/*.{ts,tsx}",
// 		"./app/**/*.{ts,tsx}",
// 		"./src/**/*.{ts,tsx}",
// 	],
// 	prefix: "",
// 	theme: {
// 		container: {
// 			center: true,
// 			padding: '2rem',
// 			screens: {
// 				'2xl': '1400px'
// 			}
// 		},
// 		extend: {
// 			colors: {
// 				border: 'hsl(var(--border))',
// 				input: 'hsl(var(--input))',
// 				ring: 'hsl(var(--ring))',
// 				background: 'hsl(var(--background))',
// 				foreground: 'hsl(var(--foreground))',
// 				primary: {
// 					DEFAULT: 'hsl(var(--primary))',
// 					foreground: 'hsl(var(--primary-foreground))'
// 				},
// 				secondary: {
// 					DEFAULT: 'hsl(var(--secondary))',
// 					foreground: 'hsl(var(--secondary-foreground))'
// 				},
// 				destructive: {
// 					DEFAULT: 'hsl(var(--destructive))',
// 					foreground: 'hsl(var(--destructive-foreground))'
// 				},
// 				muted: {
// 					DEFAULT: 'hsl(var(--muted))',
// 					foreground: 'hsl(var(--muted-foreground))'
// 				},
// 				accent: {
// 					DEFAULT: 'hsl(var(--accent))',
// 					foreground: 'hsl(var(--accent-foreground))'
// 				},
// 				popover: {
// 					DEFAULT: 'hsl(var(--popover))',
// 					foreground: 'hsl(var(--popover-foreground))'
// 				},
// 				card: {
// 					DEFAULT: 'hsl(var(--card))',
// 					foreground: 'hsl(var(--card-foreground))'
// 				},
// 				sidebar: {
// 					DEFAULT: 'hsl(var(--sidebar-background))',
// 					foreground: 'hsl(var(--sidebar-foreground))',
// 					primary: 'hsl(var(--sidebar-primary))',
// 					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
// 					accent: 'hsl(var(--sidebar-accent))',
// 					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
// 					border: 'hsl(var(--sidebar-border))',
// 					ring: 'hsl(var(--sidebar-ring))'
// 				},
// 				// Custom colors for Take A Peek app
// 				turquoise: {
// 					50: '#eefffe',
// 					100: '#cbfffc',
// 					200: '#98fff9',
// 					300: '#62fff6',
// 					400: '#22f8ee',
// 					500: '#0ae0d7',
// 					600: '#00b4ad',
// 					700: '#00908b',
// 					800: '#007571',
// 					900: '#00615f',
// 					950: '#00373a',
// 				},
// 				darkblue: {
// 					50: '#f0f3f8',
// 					100: '#dce5ef',
// 					200: '#c2d1e3',
// 					300: '#9cb6d1',
// 					400: '#7094ba',
// 					500: '#5078a2',
// 					600: '#426088',
// 					700: '#384f70',
// 					800: '#32435e',
// 					900: '#1A2A3A', // Deep navy
// 					950: '#111927',
// 				},
// 			},
// 			borderRadius: {
// 				lg: 'var(--radius)',
// 				md: 'calc(var(--radius) - 2px)',
// 				sm: 'calc(var(--radius) - 4px)'
// 			},
// 			fontFamily: {
// 				sans: ['Inter', 'sans-serif'],
// 				display: ['Poppins', 'sans-serif'],
// 			},
// 			keyframes: {
// 				'accordion-down': {
// 					from: { height: '0' },
// 					to: { height: 'var(--radix-accordion-content-height)' }
// 				},
// 				'accordion-up': {
// 					from: { height: 'var(--radix-accordion-content-height)' },
// 					to: { height: '0' }
// 				},
// 				float: {
// 					'0%, 100%': { transform: 'translateY(0)' },
// 					'50%': { transform: 'translateY(-10px)' }
// 				},
// 				'fade-in': {
// 					'0%': { opacity: '0', transform: 'translateY(10px)' },
// 					'100%': { opacity: '1', transform: 'translateY(0)' }
// 				},
// 				'fade-in-right': {
// 					'0%': { opacity: '0', transform: 'translateX(20px)' },
// 					'100%': { opacity: '1', transform: 'translateX(0)' }
// 				},
// 				'image-shimmer': {
// 					'0%': { backgroundPosition: '-1000px 0' },
// 					'100%': { backgroundPosition: '1000px 0' }
// 				}
// 			},
// 			animation: {
// 				'accordion-down': 'accordion-down 0.2s ease-out',
// 				'accordion-up': 'accordion-up 0.2s ease-out',
// 				'float': 'float 6s ease-in-out infinite',
// 				'fade-in': 'fade-in 0.6s ease-out',
// 				'fade-in-right': 'fade-in-right 0.6s ease-out',
// 				'image-shimmer': 'image-shimmer 2s infinite linear'
// 			},
// 			backgroundImage: {
// 				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
// 				'hero-pattern': 'linear-gradient(to bottom right, rgba(26, 42, 58, 0.7), rgba(0, 180, 173, 0.4))',
// 				'feature-pattern': 'linear-gradient(to bottom, rgba(240, 253, 255, 0), rgba(10, 224, 215, 0.1))',
// 			}
// 		}
// 	},
// 	plugins: [require("tailwindcss-animate")],
// } satisfies Config;

// import type { Config } from "tailwindcss"

// const config: Config = {
// 	darkMode: "class",
// 	content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         teal: {
//           50: "#f0fdfa",
//           100: "#ccfbf1",
//           200: "#99f6e4",
//           300: "#5eead4",
//           400: "#2dd4bf",
//           500: "#14b8a6",
//           600: "#0d9488",
//           700: "#0f766e",
//           800: "#115e59",
//           900: "#134e4a",
//           950: "#042f2e",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// }

// export default config

import type { Config } from "tailwindcss"

const config = {
	darkMode: "class",  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0c678d",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#0d818f",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#0aa997",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
