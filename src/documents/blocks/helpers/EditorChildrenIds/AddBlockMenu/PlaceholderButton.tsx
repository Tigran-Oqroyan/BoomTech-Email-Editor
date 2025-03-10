import React from 'react';

import { AddOutlined } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';

type Props = {
  onClick: () => void;
};
export default function PlaceholderButton({ onClick }: Props) {
  return (
    <ButtonBase
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
      sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: 48,
        width: '100%',
        bgcolor: '#EBEBEB',
      }}
    >
      <AddOutlined
        sx={{
          p: 0.12,
          bgcolor: '#D5D5D5',
          borderRadius: 24,
          color: 'primary.contrastText',
        }}
        fontSize="small"
      />
    </ButtonBase>
  );
}
