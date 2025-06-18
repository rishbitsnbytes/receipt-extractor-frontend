# Receipt Extractor Frontend

A React + TypeScript application for extracting structured data from receipt images using an AI-powered backend.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Backend & AI Model](#backend--ai-model)
- [Database](#database)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

This project allows users to upload receipt images and extract details such as vendor, date, currency, items, tax, and total cost. The frontend communicates with a backend service that performs AI-based OCR and data extraction.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Mantine UI, Axios
- **Backend:** NestJS (Node.js framework)
- **AI Model:** Google Document AI (for OCR and data extraction)
- **Database:** MongoDB (used by the backend)

---

## Project Structure

```
/receipt-extractor-frontend
├── sample-receipts/            # Example receipt images for testing
├── src/
│   ├── features/
│   │   ├── components/
│   │   │   ├── dropzone/
│   │   │   │   ├── DropzoneButton.module.css
│   │   │   │   └── DropzoneButton.tsx
│   │   │   ├── extraction-result/
│   │   │   │   └── ExtractionResult.tsx
│   │   │   ├── file-preview/
│   │   │   │   └── FilePreview.tsx
│   │   │   ├── loader/
│   │   │   │   └── Loader.tsx
│   │   │   └── index.ts
│   │   ├── receipt-extraction/
│   │   │   └── ReceiptExtraction.tsx
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── receipt.types.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── commonStyles.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## Setup Instructions

1. **Clone this repository locally**
   ```bash
   git clone <repo-url>
   cd receipt-extractor-frontend-ai-engineer-rishbitsnbytes
   ```

2. **Set your node environment**
   - Run `nvm install && nvm use`, or
   - Manually set your node to v18+ and npm to v10+

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   - Copy `.env.sample` to `.env` and adjust as needed:
     ```bash
     cp .env.sample .env
     ```
   - Example:
     ```
     VITE_APP_NAME="Receipt Extractor"
     VITE_API_BASE_URL=http://localhost:5173
     VITE_APP_BACKEND_BASE_URL=http://localhost:3000
     ```

---

## Environment Variables

| Variable                       | Description                        | Example Value                |
|---------------------------------|------------------------------------|------------------------------|
| `VITE_APP_NAME`                 | Application name                   | "Receipt Extractor"          |
| `VITE_API_BASE_URL`             | Frontend base URL                  | http://localhost:5173        |
| `VITE_APP_BACKEND_BASE_URL`     | The URL of the backend API         | http://localhost:3000        |

---

## Running the Application

1. **Ensure the backend service is running and accessible**  
   - The backend should be a NestJS server running on the port specified in your `.env` (default: `http://localhost:3000`).

2. **Start the frontend application**
   ```bash
   npm run dev
   ```

3. **Open your browser and navigate to**  
   [http://localhost:5173/](http://localhost:5173/) (or the port displayed in your terminal).

4. **Upload a receipt image** using the provided interface.

5. **View the extracted details** displayed on the screen.

---

## Backend & AI Model

- **Backend:**  
  The backend is built with [NestJS](https://nestjs.com/) and exposes a `POST /receipt/data-extraction` endpoint that accepts a file upload (`multipart/form-data`) and returns extracted receipt data in JSON format.

- **AI Model:**  
  The backend uses [Google Document AI](https://cloud.google.com/document-ai) for OCR and data extraction from receipt images. This enables robust extraction across various receipt formats and languages.

- **Database:**  
  The backend uses MongoDB to store user data, receipt images, and extracted data for further processing and analysis.

---

## Database

- **Frontend:**  
  No database is required for the frontend application.

- **Backend:**  
  Uses MongoDB. Refer to the backend documentation for setup and connection details.

---

## Usage

- To upload a receipt image, click on the "Upload Receipt" button and select an image file from your device.
- The application supports common image formats such as JPEG and PNG.
- Once the image is uploaded, the application will display a preview of the image and the extracted details.
- You can start a new extraction at any time.

---

## Troubleshooting

- **404/4404 errors:**  
  Ensure your backend is running and the endpoint `/receipt/data-extraction` exists.

- **CORS errors:**  
  Make sure your backend allows requests from the frontend's origin.

- **AI/Extraction errors:**  
  Ensure your backend is correctly configured to use Google Document AI and that your Google Cloud credentials are valid.

- **Database errors:**  
  Ensure MongoDB is running and accessible by the backend.

- **Other issues:**  
  Check the browser console and backend logs for error messages.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with descriptive messages.
4. Push your branch to your forked repository.
5. Create a pull request to merge your changes into the main repository.

Please ensure that your code follows the project's coding standards and guidelines. Write clear and descriptive commit messages. Test your changes thoroughly before submitting the pull request.

---

## License

MIT (or as specified in the repository)

---

**Questions?**  
Open an issue or contact the maintainer.  
Maintainer - Rishabh Rathore - rishabhrathore1613@gmail.com
