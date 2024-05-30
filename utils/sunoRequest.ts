// const axios = require("axios");
import axios from 'axios';


// replace your vercel domain
const baseUrl = "http://localhost:3000";

async function customGenerateAudio(payload: any) {
    const url = `${baseUrl}/api/custom_generate`;
    const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
}

async function generateAudioByPrompt(payload: any) {
    const url = `${baseUrl}/api/generate`;
    const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
}

async function extendAudio(payload: any) {
    const url = `${baseUrl}/api/extend_audio`;
    const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
}

async function getAudioInformation(audioIds: string) {
    const url = `${baseUrl}/api/get?ids=${audioIds}`;
    const response = await axios.get(url);
    return response.data;
}

async function getQuotaInformation() {
    const url = `${baseUrl}/api/get_limit`;
    const response = await axios.get(url);
    return response.data;
}

async function getClipInformation(clipId: string) {
    const url = `${baseUrl}/api/clip?id=${clipId}`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {
    customGenerateAudio,
    generateAudioByPrompt,
    extendAudio,
    getAudioInformation,
    getQuotaInformation,
    getClipInformation,
};
