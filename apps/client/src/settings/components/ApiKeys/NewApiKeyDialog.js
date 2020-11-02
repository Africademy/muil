import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, Input as BaseInput, CopyButton as BaseCopyButton } from 'shared/components';

const Input = styled(BaseInput)`
	width: 100%;
`;

const Note = styled.div`
	color: ${({ theme }) => theme.colors.dark};
	margin-bottom: 18px;
`;

const Result = styled.pre`
	position: relative;
	margin: 0;
	background: ${({ theme }) => theme.colors.gray3};
	padding: 16px 35px 16px 16px;
	overflow: auto;
`;

const CopyButton = styled(BaseCopyButton)`
	position: absolute;
	right: 7px;
	top: 11px;
`;

const NewApiKeyDialog = ({ onClose, onCreateNewKey }) => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [key, setKey] = useState();

	return (
		<Dialog
			onClose={onClose}
			title="Add New Api Key"
			confirmButtonText={key ? 'Close' : undefined}
			onConfirm={async () => {
				if (key) {
					onClose();
					return;
				}
				setLoading(true);
				const result = await onCreateNewKey({ name });
				setLoading(false);
				setKey(result);
			}}
			showCancel={!key}
			onCancel={onClose}
			loading={loading}
		>
			{key ? (
				<>
					<Note>
						Note that this API key <b>will only be displayed now</b> you will not be able to recover it:
					</Note>

					<Result>
						{key.apiKey}
						<CopyButton copyText={key.apiKey} />
					</Result>
				</>
			) : (
				<Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a name..." />
			)}
		</Dialog>
	);
};

export default NewApiKeyDialog;
