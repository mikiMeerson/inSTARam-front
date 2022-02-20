import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface AlertProps {
    header: string;
    content: string;
    isOpen: boolean;
    setIsOpen: (param: boolean) => void;
    activateResponse?: (param:any) => any;
    param?: any;
}

const DialogAlert = ({
  header,
  content,
  isOpen,
  setIsOpen,
  activateResponse,
  param,
}: AlertProps) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
  >
    <DialogTitle dir="rtl">
      {header}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        color="error"
        variant="contained"
        onClick={() => {
          setIsOpen(false);
          (activateResponse && param) && activateResponse(param);
        }}
        autoFocus
      >
        הבנתי
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogAlert;

DialogAlert.defaultProps = {
  activateResponse: undefined,
  param: undefined,
};
