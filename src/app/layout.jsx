import "./globals.css";

export const metadata = {
  title: "Its a Bug",
  description: "Hello",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
