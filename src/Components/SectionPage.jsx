import React from "react";
import { useLocation } from "react-router-dom";

function slugToTitle(slug) {
    if (!slug) return "Overview";
    return slug
        .split("/")
        .filter(Boolean)
        .slice(-1)[0]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SectionPage() {
    const location = useLocation();
    const title = slugToTitle(location.pathname.replace(/^\/dashboard\/?/, ""));
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <p className="text-gray-700">This is {title.toLowerCase()}</p>
        </div>
    );
}