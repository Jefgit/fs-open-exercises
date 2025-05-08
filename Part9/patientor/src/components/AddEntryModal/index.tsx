import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { EntryForm } from "./EntryForm";
import { Patient } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
//   error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, setPatients }: Props) => {

    return(
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>Add a new entry</DialogTitle>
            <Divider />
            <DialogContent>
              <EntryForm setPatients = {setPatients}   onCancel={onClose}/>
            </DialogContent>
          </Dialog>
    );
};

export default AddEntryModal;