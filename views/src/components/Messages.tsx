import { Badge, Box } from '@chakra-ui/react';
import OuterMessage from 'components/OuterMessage';
import UserMessage from 'components/UserMessage';
import { useSocketContext } from 'context/SocketContext';
import React from 'react';

const Messages: React.FC = () => {
  const { messages, usersOnline } = useSocketContext()

  return (
    <>
      <Badge colorScheme='green'>{usersOnline} Online Users</Badge>
      <Box
        w="60%"
        minW="380px"
        h="55%"
        bg="bisque"
        borderRadius={"20px"}
        marginY="20px"
        overflowY={"scroll"}
        padding="10px"
        display={"flex"}
        flexDirection="column"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'black',
            borderRadius: '24px',
          },
        }}
      >
        {messages.map((message, index) => {
          if (message.user === "You") {
            return <UserMessage message={message} key={index} />
          } else {
            return <OuterMessage message={message} key={index} />
          }
        })}
      </Box>
    </>
  );
}

export default Messages;