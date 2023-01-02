import {useState, useEffect} from 'react';
import {Stack} from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TuneIcon from '@mui/icons-material/Tune';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { productsActions } from '../features/product/productsSlice';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: "80%", sm: "400px"},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface props{
    getProducts: (endpoint: string) => void
}

export default function BasicModal(props: props) {
    const user = useAppSelector((state) => state.auth);
    const filter = useAppSelector((state) => state.product.filter);
    const dispatch = useAppDispatch();
    const [state, setState] = useState<string>("all");
    const [category, setCategory] = useState<string>("all");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };

    useEffect(() => {
        if (filter.state !== "load"){
            setState(filter.state);
        }

        if (filter.category !== "load"){
            setCategory(filter.category);
        }
    }, []);
    
    const handleChangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value);
    }

    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }

    const applyHandler = () => {
        dispatch(productsActions.setFilter({state, category, price: "all"}));
        if (user.userId){
            props.getProducts(`/products/getProducts/?limit=8&skip=0&state=${state}&category=${category}&sold=false&notUserId=${user.userId}`);
        } else{
            props.getProducts(`/products/getProducts/?limit=8&skip=0&state=${state}&category=${category}&sold=false`);
        }
        setOpen(false);
    }

    return (
        <div>
        <TuneIcon onClick={handleOpen} /> 
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction = "column" spacing = {2}>
                    <div>
                        <p style = {{margin : "0px"}}>State</p>
                        <select name="state" value = {state} onChange={handleChangeState} id="state" className="form-control" required>
                            <option value="all">all</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                    </div>

                    <div>
                        <p style = {{margin : "0px"}}>Category</p>
                        <select name="state" value = {category} onChange={handleChangeCategory} id="state" className="form-control" required>
                            <option value="all">all</option>
                            <option value="Cars">Cars</option>
                            <option value="Properties">Properties</option>
                            <option value="Phones">Phones</option>
                            <option value="Bikes">Bikes</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Pets">Pets</option>
                        </select>
                    </div>
                    <Button onClick = {applyHandler} style = {{color: "green"}}>Apply</Button>
                </Stack>
            </Box>
        </Modal>
        </div>
    );
}