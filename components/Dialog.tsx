// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog


import {  useRef, type ReactNode } from 'react';

type DialogProps = {
	closeOnOutsideClick?: boolean;
	children:ReactNode
  }

export default function Dialog({closeOnOutsideClick=true,children,}:DialogProps) {


	const dialogRef = useRef<HTMLDialogElement>(null!);
	const openDialog = () => dialogRef.current.showModal();
	const closeDialog=()=> dialogRef.current.close()


	const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {		
		if(!dialogRef.current) return;

		if(!(e.target instanceof HTMLElement)) return ;	
		const isClickInside = e.target.closest('.modal__inner');
		if(!isClickInside && closeOnOutsideClick){
			closeDialog();
		}
		};



	return (
    	<div>
        	<button onClick={openDialog}>Weitere Informationen</button>
        	<dialog className="modal" ref={dialogRef} onClick={handleOutsideClick} aria-hidden="true">
            	<div className="modal__inner">
                	<button
                    	className="modal__close"
                    	aria-label="Schließen"
                    	title="Schließen"
						onClick={closeDialog}
                	>
                    	&times;
                	</button>
				 {children}
            	</div>
        	</dialog>

    	</div>

	);
	
}