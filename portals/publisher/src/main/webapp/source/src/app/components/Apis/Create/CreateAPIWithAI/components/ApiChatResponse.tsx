/* eslint-disable */
/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.
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

// import React, { useEffect, useState } from 'react';
// import { FormattedMessage, useIntl } from 'react-intl';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Tooltip from '@mui/material/Tooltip';
// import Grid from '@mui/material/Grid';
// import Chip from '@mui/material/Chip';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import DangerousIcon from '@mui/icons-material/Dangerous';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import { styled, alpha } from '@mui/material/styles';
// import { CircularProgress, Typography } from '@mui/material';
// import xmlFormat from 'xml-formatter';
// import Utils from 'AppData/Utils';
// import CustomIcon from 'AppComponents/Shared/CustomIcon';
// import IconButton from '@mui/material/IconButton';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import CustomizedAccordions from './CustomizedAccordions';
// import Button from '@mui/material/Button';

// const PREFIX = 'ApiChatResponse';
// const CONTENT_TYPE: string = 'Content-Type';
// const APPLICATION_JSON: string = 'application/json';
// const APPLICATION_XML: string = 'application/xml';
// const TEXT_PLAIN: string = 'text/plain';

// const classes = {
//     finalOutcomeContent: `${PREFIX}-finalOutcomeContent`,
//     lastQueryWrap: `${PREFIX}-lastQueryWrap`,
//     queryProcessLoader: `${PREFIX}-queryProcessLoader`,
//     responseBannerContentWrap: `${PREFIX}-responseBannerContentWrap`,
//     responseBannerContent: `${PREFIX}-responseBannerContent`,
//     responseBannerTriangle: `${PREFIX}-responseBannerTriangle`,
//     queryBannerTriangle: `${PREFIX}-queryBannerTriangle`,
//     queryBannerContent: `${PREFIX}-queryBannerContent`,
//     queryBannerContentWrap: `${PREFIX}-queryBannerContentWrap`,
// };

// const Root = styled('div')(({ theme }) => ({
//     [`& .${classes.finalOutcomeContent}`]: {
//         paddingTop: theme.spacing(2),
//         paddingBottom: theme.spacing(2),
//         textAlign: 'justify',
//     },
//     [`& .${classes.lastQueryWrap}`]: {
//         margin: theme.spacing(1, 4),
//     },
//     [`& .${classes.queryProcessLoader}`]: {
//         marginTop: theme.spacing(2),
//         display: 'flex',
//         justifyContent: 'center',
//     },
//     [`& .${classes.responseBannerContentWrap}`]: {
//         flexGrow: 1,
//         display: 'flex',
//         alignItems: 'center',
//     },
//     [`& .${classes.queryBannerContentWrap}`]: {
//         flexGrow: 1,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         marginBottom:'40px',
//     },
//     [`& .${classes.responseBannerContent}`]: {
//         width: '100%',
//         background: theme.palette.grey[100],
//         padding: theme.spacing(2),
//         borderRadius: theme.spacing(0, 2, 2, 2),
//         position: 'relative',
//     },
//     [`& .${classes.queryBannerContent}`]: {
//         background: `${alpha(theme.palette.primary.main, 0.1)}`,
//         padding: theme.spacing(2),
//         borderRadius: theme.spacing(2, 0, 2, 2),
//         position: 'relative',
//     },
//     [`& .${classes.queryBannerTriangle}`]: {
//         color: 'red',
//         position: 'absolute',
//         width: theme.spacing(33),
//         height: theme.spacing(33),
//         top: 0,
//         right: theme.spacing(-2),
//         overflow: 'hidden',
//         '&:before': {
//             content: '""',
//             display: 'block',
//             width: '200%',
//             height: '200%',
//             position: 'absolute',
//             borderRadius: '50%',
//             top: 0,
//             left: 0,
//         },
//     },
//     [`& .${classes.responseBannerTriangle}`]: {
//         position: 'absolute',
//         width: theme.spacing(3),
//         height: theme.spacing(3),
//         top: 0,
//         left: theme.spacing(-2),
//         overflow: 'hidden',
//         '&:before': {
//             content: '""',
//             display: 'block',
//             width: '200%',
//             height: '200%',
//             position: 'absolute',
//             borderRadius: '50%',
//             top: 0,
//             right: 0,
//         },
//     },
// }));

// interface ApiChatResponseProps {
//     lastQuery: string;
//     executionResults: any;
//     isSuggestion: boolean;
//     // finalOutcome: string;
//     finalOutcome: Record<string, { title: string, description: string }> | string;
//     onTitlesSelected: (titles: string[]) => void;
// }

// /**
//  * Renders the API Chat results view.
//  * @returns {TSX} API Chat results view to render.
//  */
// const ApiChatResponse: React.FC<ApiChatResponseProps> = ({
//     lastQuery,
//     executionResults,
//     finalOutcome,
//     isSuggestion,
//     onTitlesSelected,
// }) => {
//     const intl = useIntl();
//     const [user, setUser] = useState('You');
//     const [selectedTitles, setSelectedTitles] = useState<string[]>([]);



//     // useEffect(() => {
//     //     const loggedInUser = Utils.getUser();
//     //     if (loggedInUser) {
//     //         setUser(loggedInUser);
//     //     }
//     // }, []);

//     const copyText = intl.formatMessage({
//         id: 'Apis.Details.ApiChat.components.ApiChatResponse.CopyToClipboard.copyText',
//         defaultMessage: 'Copy cURL to Clipboard',
//     });
//     const copiedText = intl.formatMessage({
//         id: 'Apis.Details.ApiChat.components.ApiChatResponse.CopyToClipboard.copiedText',
//         defaultMessage: 'Copied',
//     });

//     const [copyBtnText, setCopyBtnText] = useState(copyText);

//     const handleTooltipClose = () => {
//         setCopyBtnText(copyText);
//     };

//     const handleCurlCopyClick = (curl: string) => {
//         setCopyBtnText(copiedText);
//         navigator.clipboard.writeText(curl);
//     };

//     /**
//      * Infer the content type of the response.
//      *
//      * @param {string} str Response body.
//      * @returns {string} Content type of the response.
//      */
//     const inferContentType = (str: string) => {
//         const trimmedStr = str.trim();
//         const xmlRegex = /^\s*<[^>]+>/;
//         const jsonRegex = /^[\\{\\[](.*?)[\\}\]]$/;

//         if (xmlRegex.test(trimmedStr)) {
//             return APPLICATION_XML;
//         }
//         if (jsonRegex.test(trimmedStr)) {
//             try {
//                 JSON.parse(trimmedStr);
//                 return APPLICATION_JSON;
//             } catch (error) {
//                 // Handle potential invalid JSON structure
//             }
//         }
//         return TEXT_PLAIN;
//     };

//     /**
//      * Renders the execution result body.
//      *
//      * @param {any} executionResult Execution result to render.
//      * @returns {JSX.Element} Execution result body to render.
//      */
//     const renderExecutionResultBody = (executionResult: any) => {
//         // Determine content type
//         let contentType = APPLICATION_JSON;
//         const noContentType = executionResult.headers && Object.keys(executionResult.headers).length === 0;
//         if (noContentType) {
//             contentType = inferContentType(executionResult.body);
//         } else {
//             contentType = executionResult.headers[CONTENT_TYPE];
//         }

//         if (contentType.includes(APPLICATION_JSON) && executionResult.body !== '') {
//             // return (
//             //     <MonacoEditor
//             //         width='100%'
//             //         height='200'
//             //         language='json'
//             //         value={JSON.stringify(JSON.parse(executionResult.body), null, 2)}
//             //         options={{
//             //             readOnly: true,
//             //             minimap: { enabled: false },
//             //             scrollBeyondLastLine: false,
//             //             wordWrap: 'on',
//             //         }}
//             //     />
//             // );
//         } else if (contentType.includes(APPLICATION_XML) && executionResult.body !== '') {
//             const formattedMessage = xmlFormat(executionResult.body);
//             // return (
//             //     <MonacoEditor
//             //         width='100%'
//             //         height='200'
//             //         language='xml'
//             //         value={formattedMessage}
//             //         options={{
//             //             readOnly: true,
//             //             minimap: { enabled: false },
//             //             scrollBeyondLastLine: false,
//             //             wordWrap: 'on',
//             //         }}
//             //     />
//             // );
//         } else {
//             return (
//                 <Typography variant='body1'>
//                     {executionResult.body}
//                 </Typography>
//             );
//         }
//     };

//     // --------------------------------------------------------------------------------------

//     const capitalizeWords = (text: string): string => {
//         if (typeof text !== 'string') return text;
//         return text
//             .split(' ')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
//             .join(' ');
//     };

//     const handleAddTitle = (title: string) => {
//         setSelectedTitles((prevTitles) => [...prevTitles, title]);
//     };

//     const handleRemoveTitle = (title: string) => {
//         setSelectedTitles((prevTitles) => prevTitles.filter((t) => t !== title));
//     };

//     const handleApplyChanges = () => {
//         onTitlesSelected(selectedTitles);
//     };
//     // --------------------------------------------------------------------------------------

//     return (
//         <Root>
//             <Box maxHeight='60%' className={classes.lastQueryWrap}>
//                 <Paper>
//                     <Grid justifyContent='flex-end' container>
//                         <Tooltip
//                             title={user.toUpperCase()}
//                             aria-label={user.toUpperCase()}
//                             placement='bottom'
//                         >
//                             <AccountCircleIcon fontSize='large' sx={{ color: '#10597f', marginRight: 2 }} />
//                         </Tooltip>
//                     </Grid>
//                     <Box className={classes.queryBannerContentWrap} ml={6} mr={6} mt={-1}>
//                         <Box className={classes.queryBannerContent}>
//                             <Box className={classes.queryBannerTriangle} />
//                             <Typography variant='body1' align='left'>
//                                 {lastQuery}
//                             </Typography>
//                         </Box>
//                     </Box>

//                     {/* <CustomIcon width={50} height={50} icon='api-chat' /> */}
//                     <Box className={classes.responseBannerContentWrap} ml={6} mr={6} mt={-2.5}>
//                         <Box className={classes.responseBannerContent}>
//                             <Box className={classes.responseBannerTriangle} />

//                             {lastQuery && finalOutcome && (
//                                 <>
//                                     {isSuggestion ? (
//                                         <Box display='flex' flexDirection='column' width='100%'>
//                                             <Typography variant='body1' sx={{ padding: 2, whiteSpace: 'pre-line' }}>
//                                                 I have successfully generated your API!
//                                                 To further enhance its functionality and performance, here are a few expert recommendations to elevate your API to the next level.{"\n"}{"\n"}
//                                                 If everything looks good, you can click the <span style={{ color: '#3764b3', fontWeight: 'bold' }}>Create API</span> button on the right-side panel to proceed.
//                                             </Typography>
//                                             <Typography variant='body1'>
//                                                 {(() => {
//                                                     let parsedOutcome = finalOutcome;
//                                                     if (typeof finalOutcome === 'string') {
//                                                         try {
//                                                             parsedOutcome = JSON.parse(finalOutcome);
//                                                         } catch (error) {
//                                                             console.error('Failed to parse finalOutcome:', error);
//                                                         }
//                                                     }
//                                                     return typeof parsedOutcome === 'object' && !Array.isArray(parsedOutcome) ? (
//                                                         Object.keys(parsedOutcome).map((key) => (
//                                                             <CustomizedAccordions
//                                                                 key={key}
//                                                                 title={capitalizeWords(parsedOutcome[key].title)} 
//                                                                 description={capitalizeWords(parsedOutcome[key].description)} 
//                                                                 onAdd={handleAddTitle}
//                                                                 onRemove={handleRemoveTitle}
//                                                             />
//                                                         ))
//                                                     ) : (
//                                                         <Typography>{finalOutcome}</Typography>
//                                                     );
//                                                 })()}
//                                             </Typography>
//                                             <Box marginTop={2}>
//                                                 <Button
//                                                     variant='contained'
//                                                     color='primary'
//                                                     onClick={handleApplyChanges}
//                                                 >
//                                                     APPLY CHANGES
//                                                 </Button>
//                                             </Box>
//                                         </Box>
//                             ) : (
//                                 <>
//                                 </>
//                             )}
//                         </>
//                     )}
//                         </Box>
//                     </Box>
//                 </Paper>
//             </Box>
//         </Root>
//     );
// };

// export default ApiChatResponse;

// import React from 'react';
// import { Box, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import { CircularProgress, Typography } from '@mui/material';
import xmlFormat from 'xml-formatter';
import Utils from 'AppData/Utils';
import CustomIcon from 'AppComponents/Shared/CustomIcon';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CustomizedAccordions from './CustomizedAccordions';
import Button from '@mui/material/Button';

const PREFIX = 'ApiChatResponse';
const CONTENT_TYPE: string = 'Content-Type';
const APPLICATION_JSON: string = 'application/json';
const APPLICATION_XML: string = 'application/xml';
const TEXT_PLAIN: string = 'text/plain';

const classes = {
    finalOutcomeContent: `${PREFIX}-finalOutcomeContent`,
    lastQueryWrap: `${PREFIX}-lastQueryWrap`,
    queryProcessLoader: `${PREFIX}-queryProcessLoader`,
    responseBannerContentWrap: `${PREFIX}-responseBannerContentWrap`,
    responseBannerContent: `${PREFIX}-responseBannerContent`,
    responseBannerTriangle: `${PREFIX}-responseBannerTriangle`,
    queryBannerTriangle: `${PREFIX}-queryBannerTriangle`,
    queryBannerContent: `${PREFIX}-queryBannerContent`,
    queryBannerContentWrap: `${PREFIX}-queryBannerContentWrap`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.finalOutcomeContent}`]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'justify',
    },
    [`& .${classes.lastQueryWrap}`]: {
        margin: theme.spacing(1, 4),
    },
    [`& .${classes.queryProcessLoader}`]: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    [`& .${classes.responseBannerContentWrap}`]: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    [`& .${classes.queryBannerContentWrap}`]: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom:'40px',
    },
    [`& .${classes.responseBannerContent}`]: {
        width: '100%',
        background: theme.palette.grey[100],
        padding: theme.spacing(2),
        borderRadius: theme.spacing(0, 2, 2, 2),
        position: 'relative',
    },
    [`& .${classes.queryBannerContent}`]: {
        background: `${alpha(theme.palette.primary.main, 0.1)}`,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2, 0, 2, 2),
        position: 'relative',
    },
    [`& .${classes.queryBannerTriangle}`]: {
        color: 'red',
        position: 'absolute',
        width: theme.spacing(33),
        height: theme.spacing(33),
        top: 0,
        right: theme.spacing(-2),
        overflow: 'hidden',
        '&:before': {
            content: '""',
            display: 'block',
            width: '200%',
            height: '200%',
            position: 'absolute',
            borderRadius: '50%',
            top: 0,
            left: 0,
        },
    },
    [`& .${classes.responseBannerTriangle}`]: {
        position: 'absolute',
        width: theme.spacing(3),
        height: theme.spacing(3),
        top: 0,
        left: theme.spacing(-2),
        overflow: 'hidden',
        '&:before': {
            content: '""',
            display: 'block',
            width: '200%',
            height: '200%',
            position: 'absolute',
            borderRadius: '50%',
            top: 0,
            right: 0,
        },
    },
}));


  interface Message {
    role: 'user' | 'system'; 
    // content: string;
    // content: string | Record<string, { title: string; description: string }>; 
    content: string | Record<string, { title: string; description: string }>;
    suggestions: boolean;
  }
  
  interface ApiChatResponse {
    messages: Message[];
    lastQuery: string;
    executionResults: any;
    // isSuggestion: boolean;
    // finalOutcome: string;
    finalOutcome: Record<string, { title: string, description: string }> | string;
    onTitlesSelected: (titles: string[]) => void;
  }
  

  /**
 * Renders the API Chat results view.
 * @returns {TSX} API Chat results view to render.
 */
  const ApiChatResponse: React.FC<ApiChatResponse> = ({ 
    messages,
    lastQuery,
    executionResults,
    finalOutcome,
    // isSuggestion,
    onTitlesSelected,
 }) => {

    const intl = useIntl();
    const [user, setUser] = useState('You');
    const [selectedTitles, setSelectedTitles] = useState<string[]>([]);



    // useEffect(() => {
    //     const loggedInUser = Utils.getUser();
    //     if (loggedInUser) {
    //         setUser(loggedInUser);
    //     }
    // }, []);

    const copyText = intl.formatMessage({
        id: 'Apis.Details.ApiChat.components.ApiChatResponse.CopyToClipboard.copyText',
        defaultMessage: 'Copy cURL to Clipboard',
    });
    const copiedText = intl.formatMessage({
        id: 'Apis.Details.ApiChat.components.ApiChatResponse.CopyToClipboard.copiedText',
        defaultMessage: 'Copied',
    });

    const [copyBtnText, setCopyBtnText] = useState(copyText);

    const handleTooltipClose = () => {
        setCopyBtnText(copyText);
    };

    const handleCurlCopyClick = (curl: string) => {
        setCopyBtnText(copiedText);
        navigator.clipboard.writeText(curl);
    };

    /**
     * Infer the content type of the response.
     *
     * @param {string} str Response body.
     * @returns {string} Content type of the response.
     */
    const inferContentType = (str: string) => {
        const trimmedStr = str.trim();
        const xmlRegex = /^\s*<[^>]+>/;
        const jsonRegex = /^[\\{\\[](.*?)[\\}\]]$/;

        if (xmlRegex.test(trimmedStr)) {
            return APPLICATION_XML;
        }
        if (jsonRegex.test(trimmedStr)) {
            try {
                JSON.parse(trimmedStr);
                return APPLICATION_JSON;
            } catch (error) {
                // Handle potential invalid JSON structure
            }
        }
        return TEXT_PLAIN;
    };

    /**
     * Renders the execution result body.
     *
     * @param {any} executionResult Execution result to render.
     * @returns {JSX.Element} Execution result body to render.
     */
    const renderExecutionResultBody = (executionResult: any) => {
        // Determine content type
        let contentType = APPLICATION_JSON;
        const noContentType = executionResult.headers && Object.keys(executionResult.headers).length === 0;
        if (noContentType) {
            contentType = inferContentType(executionResult.body);
        } else {
            contentType = executionResult.headers[CONTENT_TYPE];
        }

        if (contentType.includes(APPLICATION_JSON) && executionResult.body !== '') {
            // return (
            //     <MonacoEditor
            //         width='100%'
            //         height='200'
            //         language='json'
            //         value={JSON.stringify(JSON.parse(executionResult.body), null, 2)}
            //         options={{
            //             readOnly: true,
            //             minimap: { enabled: false },
            //             scrollBeyondLastLine: false,
            //             wordWrap: 'on',
            //         }}
            //     />
            // );
        } else if (contentType.includes(APPLICATION_XML) && executionResult.body !== '') {
            const formattedMessage = xmlFormat(executionResult.body);
            // return (
            //     <MonacoEditor
            //         width='100%'
            //         height='200'
            //         language='xml'
            //         value={formattedMessage}
            //         options={{
            //             readOnly: true,
            //             minimap: { enabled: false },
            //             scrollBeyondLastLine: false,
            //             wordWrap: 'on',
            //         }}
            //     />
            // );
        } else {
            return (
                <Typography variant='body1'>
                    {executionResult.body}
                </Typography>
            );
        }
    };

    // --------------------------------------------------------------------------------------

    const capitalizeWords = (text: string): string => {
        if (typeof text !== 'string') return text;
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
            .join(' ');
    };

    const handleAddTitle = (title: string) => {
        setSelectedTitles((prevTitles) => [...prevTitles, title]);
    };

    const handleRemoveTitle = (title: string) => {
        setSelectedTitles((prevTitles) => prevTitles.filter((t) => t !== title));
    };

    const handleApplyChanges = () => {
        onTitlesSelected(selectedTitles);
    };
    // --------------------------------------------------------------------------------------

    return (
        <Box>
            {messages.map((message, index) => (
                <Box key={index} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'}>
                    {message.role === 'system' ? (
                        <Box ml={6} mr={6} mt={-2.5}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Assistant
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#f0f0f0',
                                    padding: 2,
                                    borderRadius: '10px',
                                    position: 'relative',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    maxWidth: '60%',
                                    mt: 2,
                                    mb: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 0,
                                        height: 0,
                                        borderLeft: '10px solid transparent',
                                        borderRight: '10px solid transparent',
                                        borderBottom: '10px solid #f0f0f0',
                                        position: 'absolute',
                                        top: '-10px',
                                        left: '10px',
                                    }}
                                />
                                {message.suggestions ? (
                                    <>
                                        <Typography variant="body1" sx={{ padding: 2, whiteSpace: 'pre-line' }}>
                                            I have successfully generated your API! To further enhance its functionality and
                                            performance, here are a few expert recommendations to elevate your API to the next
                                            level.{"\n"}{"\n"}If everything looks good, you can click the{" "}
                                            <span style={{ color: '#3764b3', fontWeight: 'bold' }}>Create API</span> button
                                            on the right-side panel to proceed.
                                        </Typography>

                                        <Typography variant="body1">
                                            {(() => {
                                                let parsedContent;

                                                // Attempt to parse the message content
                                                if (typeof message.content === 'string') {
                                                    try {
                                                        parsedContent = JSON.parse(message.content);
                                                    } catch (error) {
                                                        console.error('Failed to parse message content:', error);
                                                        return (
                                                            <Typography variant="body2" color="error">
                                                                Unable to display suggestions due to a formatting issue in the content.
                                                            </Typography>
                                                        );
                                                    }
                                                } else {
                                                    parsedContent = message.content;
                                                }

                                                // Check if parsed content is a valid object
                                                if (
                                                    typeof parsedContent === 'object' &&
                                                    parsedContent !== null &&
                                                    !Array.isArray(parsedContent)
                                                ) {
                                                    return Object.keys(parsedContent).map((key) => {
                                                        const item = parsedContent[key];

                                                        // Validate item structure
                                                        if (item && item.title && item.description) {
                                                            return (
                                                                <CustomizedAccordions
                                                                    key={key}
                                                                    title={capitalizeWords(item.title)}
                                                                    description={capitalizeWords(item.description)}
                                                                    onAdd={handleAddTitle}
                                                                    onRemove={handleRemoveTitle}
                                                                />
                                                            );
                                                        } else {
                                                            console.warn(`Invalid item structure for key: ${key}`, item);
                                                            return null;
                                                        }
                                                    });
                                                } else {
                                                    console.error('Parsed content is not a valid object:', parsedContent);
                                                    return (
                                                        <Typography variant="body2" color="error">
                                                            Unable to render suggestions due to invalid content format.
                                                        </Typography>
                                                    );
                                                }
                                            })()}
                                        </Typography>

                                        <Box marginTop={2}>
                                            <Button variant="contained" color="primary" onClick={handleApplyChanges}>
                                                APPLY CHANGES
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <Typography variant="body1">{message.content}</Typography>
                                )}

                                {/* {message.isSuggestion ? (
                                    <>
                                        <Typography variant="body1" sx={{ padding: 2, whiteSpace: 'pre-line' }}>
                                            I have successfully generated your API! To further enhance its functionality and
                                            performance, here are a few expert recommendations to elevate your API to the next
                                            level.{"\n"}{"\n"}If everything looks good, you can click the{" "}
                                            <span style={{ color: '#3764b3', fontWeight: 'bold' }}>Create API</span> button
                                            on the right-side panel to proceed.
                                        </Typography>
    
                                        <Typography variant="body1">
                                            {(() => {
                                                let parsedContent = message.content;
    
                                                // If the message content is a string, attempt to parse it
                                                if (typeof message.content === 'string') {
                                                    try {
                                                        parsedContent = JSON.parse(message.content);
                                                    } catch (error) {
                                                        console.error('Failed to parse message content:', error);
                                                        return null; // If parsing fails, return nothing
                                                    }
                                                }
    
                                                // Check if parsed content is an object and render the accordions
                                                return typeof parsedContent === 'object' && !Array.isArray(parsedContent) ? (
                                                    Object.keys(parsedContent).map((key) => (
                                                        <CustomizedAccordions
                                                            key={key}
                                                            title={capitalizeWords(parsedContent[key].title)}
                                                            description={capitalizeWords(parsedContent[key].description)}
                                                            onAdd={handleAddTitle}
                                                            onRemove={handleRemoveTitle}
                                                        />
                                                    ))
                                                ) : null;
                                            })()}
                                        </Typography>
                                        <Box marginTop={2}>
                                            <Button variant="contained" color="primary" onClick={handleApplyChanges}>
                                                APPLY CHANGES
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <Typography variant="body1">{message.content}</Typography>
                                )} */}
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                maxWidth: '60%',
                                textAlign: 'right',
                                mt: 2,
                                mb: 2,
                                mr: 3,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                You
                            </Typography>
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    sx={{
                                        width: 0,
                                        height: 0,
                                        borderLeft: '10px solid transparent',
                                        borderRight: '10px solid transparent',
                                        borderBottom: '10px solid #e3f5fa',
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '10px',
                                    }}
                                />
                                <Box
                                    sx={{
                                        backgroundColor: '#e3f5fa',
                                        padding: 2,
                                        borderRadius: '10px',
                                        color: '#000',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        display: 'inline-block',
                                    }}
                                >
                                    <Typography variant="body1">{message.content}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );

    
// return (
//     <Box>
//       {messages.map((message, index) => (
//         <Box key={index} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'}>
//           {message.role === 'system' ? (
//             <Box ml={6} mr={6} mt={-2.5}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
//                         Assistant
//                 </Typography>           
//                 <Box sx={{ 
//                     backgroundColor: '#f0f0f0', 
//                     padding: 2, 
//                     borderRadius: '10px', 
//                     position: 'relative',
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                     maxWidth: '60%',
//                     mt: 2,
//                     mb: 2 
//                 }}>
//                     <Box
//                         sx={{
//                             width: 0,
//                             height: 0,
//                             borderLeft: '10px solid transparent',
//                             borderRight: '10px solid transparent',
//                             borderBottom: '10px solid #f0f0f0',
//                             position: 'absolute',
//                             top: '-10px',
//                             left: '10px',
//                         }}
//                     />
//                     {isSuggestion ? (
//                         <>
//                             <Typography variant='body1' sx={{ padding: 2, whiteSpace: 'pre-line' }}>
//                                 I have successfully generated your API!
//                                 To further enhance its functionality and performance, here are a few expert recommendations to elevate your API to the next level.{"\n"}{"\n"}
//                                 If everything looks good, you can click the <span style={{ color: '#3764b3', fontWeight: 'bold' }}>Create API</span> button on the right-side panel to proceed.
//                             </Typography>

//                             <Typography variant='body1'>
//                                 {(() => {
//                                     let parsedContent = message.content;
                                    
//                                     // If the message content is a string, attempt to parse it
//                                     if (typeof message.content === 'string') {
//                                         try {
//                                             parsedContent = JSON.parse(message.content);
//                                         } catch (error) {
//                                             console.error('Failed to parse message content:', error);
//                                             return null;  // If parsing fails, return nothing
//                                         }
//                                     }

//                                     // Check if parsed content is an object and render the accordions
//                                     return typeof parsedContent === 'object' && !Array.isArray(parsedContent) ? (
//                                         Object.keys(parsedContent).map((key) => (
//                                             <CustomizedAccordions
//                                                 key={key}
//                                                 title={capitalizeWords(parsedContent[key].title)}
//                                                 description={capitalizeWords(parsedContent[key].description)}
//                                                 onAdd={handleAddTitle}
//                                                 onRemove={handleRemoveTitle}
//                                             />
//                                         ))
//                                     ) : null;  // Remove plain text rendering fallback
//                                 })()}
//                             </Typography>
//                                 <Box marginTop={2}>
//                                     <Button
//                                         variant='contained'
//                                         color='primary'
//                                         onClick={handleApplyChanges}
//                                     >
//                                         APPLY CHANGES
//                                     </Button>
//                                 </Box>
//                         </>
//                     ) : (
//                         <Typography variant="body1">{message.content}</Typography>
//                     )}
//                 </Box>
//             </Box>
//           ) : (
//                 <Box sx={{ maxWidth: '60%', textAlign: 'right', mt: 2, mb: 2, mr: 3 }}>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
//                         You
//                     </Typography>
//                     <Box sx={{ position: 'relative' }}>
//                         <Box
//                             sx={{
//                                 width: 0,
//                                 height: 0,
//                                 borderLeft: '10px solid transparent',
//                                 borderRight: '10px solid transparent',
//                                 borderBottom: '10px solid #e3f5fa',
//                                 position: 'absolute',
//                                 top: '-10px',
//                                 right: '10px',
//                             }}
//                         />
//                         <Box
//                             sx={{
//                                 backgroundColor: '#e3f5fa',
//                                 padding: 2,
//                                 borderRadius: '10px',
//                                 color: '#000',
//                                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                                 display: 'inline-block',
//                             }}
//                         >
//                             <Typography variant="body1">{message.content}</Typography>
//                         </Box>
//                     </Box>
//                 </Box>
//             )}
//             </Box>
//         ))}
//     </Box>
//   );
};

export default ApiChatResponse;
