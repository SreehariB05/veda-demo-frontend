import Link from "next/link";
import React from "react";

export default function ViewDocument({ fileName, category }: { fileName: string; category: string }) {
    return {
        fileName,
        category
    };
}