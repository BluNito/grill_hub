import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import KeyValueTableCell from "./shared/key_value_table_cell";
import { updateUser } from "../store/actions/authActions";
import ProfileDetailsDialog from "./profile-details-dialog";

const ProfileDetails = (props) => {
  const { updateUser, user } = props;
  const [open, setOpen] = useState(false);
  const handleUpdate = async (details) => {
    const res = await updateUser(details);
    if (res) return res;
    else setOpen(false);
  };
  return (
    <React.Fragment>
      <Paper variant="outlined">
        <Toolbar>
          <div className="cart-title">User Details</div>
          <div className="grow" />
          <IconButton onClick={() => setOpen(true)}>
            <EditIcon color="secondary" />
          </IconButton>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableBody>
              <KeyValueTableCell
                table_key="Name"
                table_value={`${user.fname} ${user.lname}`}
              />
              <KeyValueTableCell
                table_key="Contact"
                table_value={user.contact}
              />
              <KeyValueTableCell table_key="Email" table_value={user.email} />
              <KeyValueTableCell table_key="Address">
                {user.address}
              </KeyValueTableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ProfileDetailsDialog
        open={open}
        user={user}
        handleUpdate={handleUpdate}
        handleClose={() => setOpen(false)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser })(ProfileDetails);
