import DashSidebar from "../components/dash-sidebar";
import DashHeader from "../components/dash-header";
import { UploadDropzone } from "./_components/upload-dropzone";
import React from "react";

export default function DocumentUploadPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans">
            <DashHeader />
            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="document-upload" />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#1a172c] mb-1">Upload Document</h1>
                        <p className="text-sm text-gray-500 font-medium">Securely upload and encrypt your files</p>
                    </div>
                    <UploadDropzone />
                </main>
            </div>
        </div>
    );
}
