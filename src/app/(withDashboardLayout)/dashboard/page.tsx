import { Box } from "@mui/material";

const DashboardHomePage = () => {
  return (
    <Box>
      <h1>Welcome to dashboard</h1>
      <div>
        <div className="flex flex-col md:flex-row lg:flex-row justify-evenly gap-5">
          <div className="border bg-sky-600 p-5 w-72 h-44 rounded-lg">
            <div className="">
            <p className="text-white text-sm">All project</p>
            <p className="text-white text-4xl py-5">89</p>
            </div>
            <hr />
            <p className="font-mono text-white">13% Increase</p>
            <div>

            </div>
          </div>

          <div className="border bg-purple-600 p-5 w-72 h-44 rounded-lg">
            <div className="">
            <p className="text-white text-sm">All project</p>
            <p className="text-white text-4xl py-5">89</p>
            </div>
            <hr />
            <p className="font-mono text-white">13% Increase</p>
            <div>

            </div>
          </div>
          <div className="border bg-rose-500 p-5 w-72 h-44 rounded-lg">
            <div className="">
            <p className="text-white text-sm">All project</p>
            <p className="text-white text-4xl py-5">89</p>
            </div>
            <hr />
            <p className="font-mono text-white">13% Increase</p>
            <div>

            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default DashboardHomePage;
