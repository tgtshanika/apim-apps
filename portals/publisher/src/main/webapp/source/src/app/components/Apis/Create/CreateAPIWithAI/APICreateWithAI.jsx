/* eslint-disable */
/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ApiChatPoweredBy from './components/ApiChatPoweredBy';
import ApiChatBanner from './components/ApiChatBanner';
import ApiChatExecute from './components/ApiChatExecute';
import ApiChatResponse from './components/ApiChatResponse';
import SampleQueryCard from './components/SampleQueryCard';
import LinearDeterminate from './components/LinearDeterminate';
import DisplayCode from './components/DisplayCode';
import WelcomeMessage from './components/WelcomeMessage';
import LoadingDots from './components/LoadingDots';
import API from 'AppData/api';

/**
 * Renders the Create API with AI UI.
 * @returns {JSX} Create API with AI page to render.
 */
const ApiCreateWithAI = () => {
    const [sessionId, setSessionId] = useState(null);
    const [inputQuery, setInputQuery] = useState('');
    const [lastQuery, setLastQuery] = useState('');
    const [finalOutcome, setFinalOutcome] = useState('');
    const [apiType, setApiType] = useState('');
    const [finalOutcomeCode, setFinalOutcomeCode] = useState('');
    const [executionResults, setExecutionResults] = useState([]);
    const [messages, setMessages] = useState([]);
    const [taskId, setTaskId] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [loading, setLoading] = useState(false); 
    const [isSuggestion, setIsSuggestion] = useState('');
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [paths, setPaths] = useState([]);
    const [apiTypeSuggestion, setApiTypeSuggestion] = useState('');
    const [missingValues, setMissingValues] = useState('');

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            const element = chatContainerRef.current;
            element.scrollTop = element.scrollHeight;
        }
    }, [messages]);
    
    const handleQueryChange = (event) => {
        const { value } = event.target;
        setInputQuery(value);
    };

    const handleExecute = async () => {
        if (inputQuery.length !== 0) {
            const query = inputQuery;
            setInputQuery('');
            setLastQuery(inputQuery);    
            setTaskStatus('IN_PROGRESS');

            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'user', content: query },
            ]);

            if (!sessionId) {
                const newSessionId = generateSessionId();
                setSessionId(newSessionId);
                sendInitialRequest(query, newSessionId);
            } else {
                sendInitialRequest(query, sessionId);
            }
        }
    };

    const handleExecuteSampleQuery = async (query) => {
        setInputQuery('');
        setLastQuery(query);
        setTaskStatus('IN_PROGRESS');

        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: query }
        ]);

        if (!sessionId) {
            const newSessionId = generateSessionId();
            setSessionId(newSessionId);
            sendInitialRequest(query, newSessionId);
        } else {
            sendInitialRequest(query, sessionId);
        }
    };

    const generateSessionId = () => {
        return `${Date.now()}`;
    };

    const handleSelectedTitles = (titles) => { 
        const titlesString = "Modify this API to include the following features as well:\n" + 
        titles.map(title => `- ${title}`).join('\n');
        setSelectedTitles(titlesString); 
        setLastQuery(titlesString);
        setTaskStatus('IN_PROGRESS');

        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: titlesString }
        ]);

        sendInitialRequest(titlesString, sessionId);
    };
    
    async function sendQuery(query, sessionId) { 
        try {
            const queryDesignAssistant = new API();
            const response = await queryDesignAssistant.sendChatAPIDesignAssistant(query, sessionId);
    
            if (!response || typeof response !== 'object') {
                throw new Error("Invalid response received from API.");
            }
    
            return response;
        } catch (error) {
            console.error("Error in sendQuery:", error);
            throw error;
        }
    }
    
    const sendInitialRequest = async (query, currentSessionId) => {
        setFinalOutcome('');
        setLoading(true);

        try {
            const jsonResponse = await sendQuery(query, currentSessionId);
            
            const {
                backendResponse,
                isSuggestions,
                typeOfApi,
                code,
                paths,
                apiTypeSuggestion,
                missingValues,
                state
            } = jsonResponse;

            setFinalOutcome(backendResponse);
            setIsSuggestion(isSuggestions);
            setApiType(typeOfApi);
            setFinalOutcomeCode(code);
            setPaths(paths);
            setApiTypeSuggestion(apiTypeSuggestion);
            setMissingValues(missingValues);
            setTaskStatus(state);

            if (backendResponse) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'system', content: backendResponse, suggestions: isSuggestions }
                ]);
            }

            if (apiTypeSuggestion) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'system', content: apiTypeSuggestion, suggestions: false }
                ]);
            }

            if (missingValues) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'system', content: missingValues, suggestions: false }
                ]);
            }

        } catch (error) {
            console.error('Error:', error);
            setFinalOutcome('An error occurred while fetching the data.');

            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'system', content: 'Sorry! I could not process your request this time. Could you please try again?', isSuggestions: false }
            ]);

            setTaskStatus('ERROR');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Stack
                direction="row"
                spacing={1}
                sx={{ width: '100%', height: '80vh' }}
            >
                <Box 
                    sx={{
                        flex: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop:'10px',
                        marginTop:'10px',
                    }}
                >
                    <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
                        {!lastQuery && (
                            <Box>
                                <WelcomeMessage/>
                                <Stack 
                                    direction="row" 
                                    spacing={7} 
                                    justifyContent="center"
                                    marginTop= '40px'
                                >
                                    <SampleQueryCard onExecuteClick={handleExecuteSampleQuery} queryHeading={'Create a REST API'} queryData={'Create an API for a banking transaction'} sx={{ textAlign: 'left' }} />
                                    <SampleQueryCard onExecuteClick={handleExecuteSampleQuery} queryHeading={'Create a SSE API'} queryData={'Create an API for live sports scores'} sx={{ textAlign: 'left' }} />
                                </Stack>
                            </Box>
                        )}
                        <Box ref={chatContainerRef} sx={{ flexGrow: 1, textAlign: 'left', overflowY: 'auto', overflowX: 'auto', scrollBehavior: 'smooth' }}>
                            {(lastQuery || finalOutcome) && (
                                <ApiChatResponse 
                                    messages={messages} 
                                    onTitlesSelected={handleSelectedTitles}
                                    taskStatus={taskStatus}
                                />
                            )}
                            {loading && <LoadingDots />}
                        </Box>
                        <Box>
                            <ApiChatExecute
                                    lastQuery={lastQuery}
                                    inputQuery={inputQuery}
                                    handleExecute={handleExecute}
                                    handleQueryChange={handleQueryChange}
                                    paths={paths} 
                            />
                        </Box>
                    </Stack>
                </Box>
                <Box 
                    sx={{
                        flex: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'left',
                        borderLeft: '1px solid #cccfdb',
                        paddingLeft: '10px',
                        backgroundColor: '#fff',
                        width:'100'
                    }}
                >
                    {taskStatus === 'IN_PROGRESS' ? (
                        <LinearDeterminate />
                    ) : taskStatus === 'COMPLETE' ? (
                        <DisplayCode 
                            finalOutcomeCode={finalOutcomeCode}
                            apiType={apiType}
                            sessionId={sessionId}
                        />
                    ) : (
                        <ApiChatBanner />
                    )}
                </Box>
            </Stack>
        </div>
    );
};

export default ApiCreateWithAI;
