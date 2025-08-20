import axiosInstance from "../../axios/axiosInterceptor";
import { Button, HStack, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const UrlShortnerComponent: React.FC = () => {
  const [inputText, setInputText] = useState<undefined | string>();
  const [responseText, setResponseText] = useState<undefined | string>();
  const { VITE_API_URL } = import.meta.env;

  const handleConvertButtonClick = () => {
    axiosInstance
      .post(`${VITE_API_URL}/shorten`, { longUrl: inputText })
      .then((response) => {
        const shortUrl: string = response.data.shortUrl;
        setResponseText(shortUrl);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };
  return (
    <HStack gap="2">
      <Input
        size="lg"
        placeholder="Enter original URL"
        onChange={(event) => setInputText(event.target.value)}
      ></Input>
      <Button color="black" onClick={handleConvertButtonClick}>
        Convert
      </Button>
      <Text>{responseText}</Text>
    </HStack>
  );
};

export default UrlShortnerComponent;
