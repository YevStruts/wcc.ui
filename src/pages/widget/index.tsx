import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Container, IconButton, Stack } from '@mui/material';
import { WidthFull } from '@mui/icons-material';
import { useState } from 'react';

export default function Widget() {
  const [fontSize, setFontSize] = useState<number>(12);
  const [playerA, setPlayerA] = useState<string>('[-NF-]Fulkrum');
  const [playerB, setPlayerB] = useState<string>('[-CPS-]Matsune');
  const [width, setWidth] = useState<number>(300);
  
  return (
    <Box>
      <Stack direction="row" alignItems={'center'} alignContent={'center'} justifyContent={'center'}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Box sx={{ width: width }} ml={-1} mr={-1} p={0.5}>
          <Stack direction="row">
            <Box>
              <Typography fontSize={fontSize}>{playerA}</Typography>
            </Box>
            <Box>
              <Typography fontSize={fontSize + 10}>1</Typography>
            </Box>
            <Box>
              <Typography fontSize={fontSize}>-</Typography>
            </Box>
            <Box>
              <Typography fontSize={fontSize}>0</Typography>
            </Box>
            <Box>
              <Typography fontSize={fontSize}>{playerB}</Typography>
            </Box>
          </Stack>
        </Box>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Stack>
    </Box>
  );
}