import React from "react";
import { Paper, TextField, Input, Button } from "@material-ui/core";
import { useStyles } from "./App";

type FormProps = {
  form: {
    item: string;
    qty: number | string;
    price: number | string;
    subtotal: string;
  };
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  handleForm: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  resetFields: () => void;
};

export const Form = (props: FormProps) => {
  const classes = useStyles();
  const { form, handleSubmit, handleForm, resetFields } = props;
  const { item, qty, price, subtotal } = form;
  return (
    <form action="#" method="GET" onSubmit={handleSubmit}>
      <Paper className={classes.paper} style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="Item name"
            name="item"
            value={item}
            onChange={handleForm}
          ></TextField>
          <TextField
            placeholder="Quantity"
            name="qty"
            value={qty}
            type="number"
            onChange={handleForm}
          ></TextField>
          <TextField
            placeholder="Price per quantity"
            name="price"
            value={price}
            type="number"
            inputProps={{ step: 0.1 }}
            onChange={handleForm}
          ></TextField>
          <Input
            placeholder="Subtotal"
            readOnly
            name="subtotal"
            value={subtotal}
            type="text"
          ></Input>
          <Button type="reset" color="secondary" onClick={resetFields}>
            Reset
          </Button>
        </div>
      </Paper>
      <br />
      <Button disabled type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};
