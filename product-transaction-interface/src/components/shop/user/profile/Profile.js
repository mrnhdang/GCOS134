import { Grid, TextField } from "@mui/material";

const Profile = ({ auth, handleOnChangeAuth }) => {
  return (
    <div>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            type="text"
            value={auth?.username}
            onChange={handleOnChangeAuth}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            type="text"
            value={auth?.address}
            onChange={handleOnChangeAuth}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            type="text"
            value={auth?.phoneNumber}
            onChange={handleOnChangeAuth}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            type="text"
            value={auth?.email}
            onChange={handleOnChangeAuth}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Balance"
            name="balance"
            type="text"
            value={auth?.balance}
            onChange={handleOnChangeAuth}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            type="text"
            value={auth?.role}
            id="outlined-disabled"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={auth?.password}
            onChange={handleOnChangeAuth}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default Profile;
