import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { forwardRef } from 'react';

const headerSX = {
    '& .MuiCardHeader-action': {mr: 0}
};

export const CardBaseComponent = forwardRef((
    {
        border = false,
        boxShadow,
        children,
        content= true,
        contentClass = '',
        contentSX = {},
        darkTitle,
        secondary,
        shadow,
        sx = {},
        title,
        ...others
    },
    ref
) => {
  return (
    <Card 
        ref={ref} 
        {...others} 
        sx={{
            border: border ? '1px solid': 'none', 
            borderColor: 'divider', 
            ':hover': {
                boxShadow: boxShadow ? boxShadow || '0 2px 14px 0 rgb (32 40 45 / 8%)' : 'inherit'
            },
            ...sx
        }}>
        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary}/>}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant='h3'>{title}</Typography>} action={secondary}/>}

        {title && <Divider />}

        {content && (
            <CardContent sx={contentSX} className={contentClass} >
                {children}
            </CardContent>
        )}
        {!content && children}
    </Card>
  )
})

CardBaseComponent.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
}

