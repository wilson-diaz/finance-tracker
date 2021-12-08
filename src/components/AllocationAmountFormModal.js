import React from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'

const AllocationAmountFormModal = () => {
  const [open, setOpen] = React.useState(false)

  const selectTransactionOptions = [
    { key: 'd', text: 'Deposit', value: 'DEPOSIT' },
    { key: 'w', text: 'Withdraw', value: 'WITHDRAW' },
  ]

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='small'>Make Transaction</Button>}
    >
      <Modal.Header>Make Transaction</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Select the type of transaction and enter an amount.</p>
          <Form>
            <Form.Select options={selectTransactionOptions} label='Transaction Type' placeholder='Transaction Type'></Form.Select>
            <Form.Input label='Amount ($)' placeholder='0.00' type='number' />
            <Form.Button>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AllocationAmountFormModal