import React from "react";
import "./Status.css";

export default function Status() {
    return (
        <div className="status-container">
        <div className="status-top">
            <h1 className="status-header">Status</h1>
        </div>
        <div className="status-bottom">
            <h1 className="status-header">Status</h1>
            <input
            type="text"
            placeholder="Status"
            className="status-input"
            aria-label="Status"
            />
            <button className="status-button">Status</button>
        </div>
        </div>
    );
    }