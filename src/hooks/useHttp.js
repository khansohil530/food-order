import React from "react";

async function sendHttpRequest(url, config){
    const response = await fetch(url, config)
    const resData = await response.json()
    if (!response.ok){
        throw new Error(resData.message || 'Something went wrong, failed to send request')
    }

    return resData
}

export default function useHttp(url,config, initialData){
    const [data, setData] = React.useState(initialData)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState()

    function clearData() {
        setData(initialData)
    }

    const sendRequest = React.useCallback(async function sendRequest(data){
        setIsLoading(true)
        try{
            const response = await sendHttpRequest(url, { ...config, body: data})
            setData(response);
        } catch(error){
            setError(error.message || 'Something when wrong.')
        }
        setIsLoading(false)
    }, [url, config])

    React.useEffect(() => {
        if(config && (config.method === 'GET' || !config.method || !config)){
            sendRequest()
        }
    }, [sendRequest, config])
    
    return {
        data, isLoading, error, sendRequest, clearData
    }
}