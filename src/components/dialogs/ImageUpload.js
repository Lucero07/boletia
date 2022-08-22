import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { Typography } from "@mui/material";

export default function ImageDialog(props) {
	const { textButton, onChange, imageName } = props
	const [open, setOpen] = React.useState(false);
	const [files, setFiles] = React.useState([]);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setFiles([])
	};

	const onDelete = (id) => {
		setFiles(files.filter((x) => x.id !== id));
	};

	return (
		<span>
			<div style={{ display: 'flex', flexDirection: 'column', }}>
				<Button variant="outlined" onClick={handleClickOpen} >
					{textButton}
				</Button>
				<Typography >{imageName}</Typography>
			</div>

			<Dialog open={open}
				onClose={handleClose}
				fullWidth
				maxWidth={'sm'}>
				<DialogTitle>Cargar imagen</DialogTitle>
				<DialogContent>
					<Dropzone
						onChange={(incommingFiles) => {
							console.log(incommingFiles)
							setFiles(incommingFiles);
						}}
						value={files}
						accept="image/*"
						behaviour="replace"
						label={"Arrastra la imagen que deseas cargar"}
						maxFiles={1}
						maxFileSize={81920}
						width='100%'
						view="grid"
						localization={"ES-es"}
						style={{
							border: "2px dashed #5233EA",
							borderRadius: "15px ",
							fontSize: '14px',
							padding: '1rem'
						}}
					>
						{files.map((file) => (
							<FileItem
								key={file.id}
								{...file}
								onDelete={onDelete}
								preview
								info
								hd
							/>
						))}
					</Dropzone>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button disabled={files.find(file => file.valid === false ? true : false)} onClick={() => {
						if (files.find(file => file.valid === true)) {
							onChange(files)
						} else {
							setFiles([])
						}
						handleClose()
					}} >Cargar</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
}
