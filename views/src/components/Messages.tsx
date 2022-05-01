import React, { useEffect, useRef } from 'react';
import { Badge, Box } from '@chakra-ui/react';
import OuterMessage from 'components/OuterMessage';
import UserMessage from 'components/UserMessage';
import { useSocketContext } from 'context/SocketContext';
import { useUserContext } from 'context/UserContext';

const Messages: React.FC = () => {
  const { messages, usersOnline } = useSocketContext()
  const { username } = useUserContext()
  const messageBox = useRef(null)

  useEffect(() => {
    if (Notification.permission === 'denied' || Notification.permission === 'default') {
      Notification.requestPermission()
    } else {
      const lastSentMessage = messages[messages.length - 1]

      if (lastSentMessage.user !== username) {
        new Notification('TTS Chat ~' + lastSentMessage.user, {
          body: lastSentMessage.message,
          vibrate: [200, 100, 200],
          icon: '/logo192.png'
        })
      }
    }


    //@ts-ignore
    messageBox?.current?.scrollTo(0, messageBox?.current?.scrollHeight)
  }, [messages])

  return (
    <>
      <Badge colorScheme='green'>{usersOnline} Online Users</Badge>
      <Box
        ref={messageBox}
        w={["95%", "50%"]}
        minW="380px"
        h={["100%", "55%"]}
        bg="bisque"
        overflowX="clip"
        borderRadius={"20px"}
        marginY="20px"
        overflowY={"scroll"}
        paddingX="10px"
        paddingY="15px"
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
          if (message.user === username) {
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