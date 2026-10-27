import { Box, Typography, IconButton, Avatar, Chip, Divider } from '@mui/material';

import {
  EditIcon,
  DeleteIcon,
  CloseIcon,
  EmailOutlinedIcon,
  LocalPhoneOutlinedIcon,
} from '../Icons';
import StatusBadge from './Fields/StatusChip';

const DetailsHeader = ({
  avatarText = '',
  title = '',
  status = '',
  tags = [],
  email = '',
  role = '',
  phone = '',
  joinedDate = '',
  onEdit,
  onDelete,
  onClose,
  isEditDisabled = false,
  isDeleteDisabled = false,
  extraActions = null,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1.2,
        gap: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        mt: 0.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flex: 1,
            minWidth: 0,
            overflowX: { xs: 'auto', sm: 'visible' },
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              flexShrink: 0,
              color: 'primary.contrastText',
              textTransform: 'capitalize',
            }}
          >
            {avatarText || (title ? title.charAt(0).toUpperCase() : '?')}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            {/* Title + Status + Tags */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: { xs: 'nowrap', sm: 'wrap' },
                overflowX: { xs: 'auto', sm: 'visible' },
              }}
            >
              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textTransform: 'capitalize',
                  flexShrink: 1,
                  minWidth: 0,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>

              {/* Status */}
              {status && <StatusBadge status={status} size="small" />}

              {/* Tags */}
              {tags?.some(tag => tag?.label) && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  {tags
                    .filter(tag => tag?.label)
                    .map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag.label}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          bgcolor: tag.color ? `${tag.color}10` : '#f3f4f6',
                          color: tag.color || 'text.secondary',
                          border: '1px solid',
                          borderColor: tag.color ? `${tag.color}30` : 'divider',
                          flexShrink: 0,
                          textTransform: 'capitalize',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                </Box>
              )}
            </Box>

            {/* Info Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 0.3,
                flexWrap: 'nowrap',
                overflowX: { xs: 'auto', sm: 'visible' },
                whiteSpace: 'nowrap',
                color: 'text.secondary',
                '& > svg': {
                  fontSize: 14,
                  flexShrink: 0,
                },
                '& > p': {
                  fontSize: 13,
                  flexShrink: 0,
                },
              }}
            >
              {email && (
                <>
                  <EmailOutlinedIcon />
                  <Typography>{email}</Typography>
                </>
              )}

              {phone && (
                <>
                  {email && <Typography>·</Typography>}
                  <LocalPhoneOutlinedIcon />
                  <Typography>{phone}</Typography>
                </>
              )}

              {joinedDate && (
                <>
                  {(email || phone) && <Typography>·</Typography>}
                  <Typography>Joined {joinedDate}</Typography>
                </>
              )}
              {role && (
                <>
                  <Typography sx={{ textTransform: 'capitalize' }}>Designation: {role}</Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Right Actions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
          }}
        >
          {/* Edit */}
          {onEdit && (
            <IconButton
              onClick={onEdit}
              disabled={isEditDisabled}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                height: 32,
                width: 32,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}

          {/* Delete */}
          {onDelete && (
            <IconButton
              onClick={onDelete}
              disabled={isDeleteDisabled}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                height: 32,
                width: 32,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}

          {extraActions}

          {(onEdit || onDelete || extraActions) && <Divider orientation="vertical" flexItem />}

          {/* Close */}
          {onClose && (
            <IconButton
              onClick={onClose}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                height: 32,
                width: 32,
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                  color: 'text.primary',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsHeader;
