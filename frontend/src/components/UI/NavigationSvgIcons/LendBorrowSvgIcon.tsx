import React from "react";

interface Props {
  color?: string;
  width?: string;
  height?: string;
  outline?: boolean;
}

const LendBorrowSvgIcon: React.FC<Props> = ({
  color = "#000000",
  width = "30",
  height = "30",
  outline = true,
}) => {
  return (
    <>
      {outline ? (
        <svg
          id="SvgjsSvg1021"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs id="SvgjsDefs1022"></defs>
          <g id="SvgjsG1023">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 64 64"
              viewBox="0 0 64 64"
              width={width}
              height={height}
            >
              <path
                d="m31 35c-.552 0-1-.448-1-1h-2c0 1.654 1.346 3 3 3v2h2v-2h3v-3c0-1.654-1.346-3-3-3h-2c-.552 0-1-.448-1-1v-1h3c.552 0 1 .448 1 1h2c0-1.654-1.346-3-3-3v-2h-2v2h-3v3c0 1.654 1.346 3 3 3h2c.552 0 1 .448 1 1v1z"
                fill={color}
              ></path>
              <path
                d="m32.473 42.976c5.687-.244 10.259-4.816 10.503-10.503 1.324.349 2.673.527 4.024.527 8.822 0 16-7.178 16-16s-7.178-16-16-16-16 7.178-16 16c0 1.351.178 2.7.527 4.024-5.687.244-10.259 4.816-10.503 10.503-1.324-.349-2.673-.527-4.024-.527-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16c0-1.351-.178-2.7-.527-4.024zm10.389-12.628c-.404-2.664-1.759-5.017-3.718-6.695.917-1.653 2.305-2.958 3.965-3.757.334 1.449 1.456 2.589 2.89 2.962v6.142h2v-6.142c1.434-.373 2.556-1.512 2.89-2.961 2.938 1.416 4.989 4.376 5.096 7.825-2.433 2.042-5.566 3.278-8.985 3.278-1.391 0-2.779-.228-4.138-.652zm.138-17.348c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4zm4 8c-1.019 0-1.853-.769-1.975-1.756.642-.146 1.299-.244 1.975-.244.68 0 1.34.082 1.977.226-.114.995-.952 1.774-1.977 1.774zm0-18c7.72 0 14 6.28 14 14 0 3.38-1.204 6.484-3.206 8.905-.739-3.816-3.458-6.925-7.041-8.232 1.368-1.1 2.247-2.785 2.247-4.673 0-3.309-2.691-6-6-6s-6 2.691-6 6c0 1.885.876 3.568 2.24 4.669-2.395.874-4.443 2.566-5.75 4.813-1.163-.673-2.458-1.135-3.838-1.344-.424-1.359-.652-2.747-.652-4.138 0-7.72 6.28-14 14-14zm-15 20c4.963 0 9 4.037 9 9s-4.037 9-9 9-9-4.037-9-9 4.037-9 9-9zm-23.986 34.721c.085-2.746 1.4-5.183 3.417-6.778l.768 6.907 4.801-3.6 4.801 3.6.768-6.907c2.018 1.595 3.333 4.032 3.417 6.778-2.434 2.043-5.567 3.279-8.986 3.279s-6.552-1.236-8.986-3.279zm4.986-14.721c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4zm4 8.438-1.866-2.24c.602-.128 1.226-.198 1.866-.198s1.264.07 1.866.197zm3.64-1.244-.44 3.955-1.757-1.318zm-6.839 3.955-.44-3.955 2.197 2.637zm13.993 1.756c-.739-3.816-3.458-6.925-7.041-8.232 1.368-1.1 2.247-2.785 2.247-4.673 0-3.309-2.691-6-6-6s-6 2.691-6 6c0 1.888.879 3.573 2.246 4.674-3.583 1.307-6.301 4.415-7.041 8.232-2.001-2.422-3.205-5.526-3.205-8.906 0-7.72 6.28-14 14-14 1.391 0 2.779.228 4.138.652.719 4.742 4.468 8.49 9.21 9.21.424 1.359.652 2.747.652 4.138 0 3.38-1.204 6.484-3.206 8.905z"
                fill={color}
              ></path>
              <path
                d="M43 46h3.954c-.412 4.439-3.537 8.27-7.882 9.511l-6.072 1.735v2.754h7c7.935 0 14.45-6.193 14.967-14h4.033l-8-10.667zm10-2v1c0 7.168-5.832 13-13 13h-2.359l1.98-.565c5.523-1.579 9.379-6.692 9.379-12.435v-1h-2l4-5.333 4 5.333zM21 18h-3.954c.412-4.439 3.537-8.27 7.882-9.511l6.072-1.735v-2.754h-7c-7.935 0-14.45 6.193-14.967 14h-4.033l8 10.667zm-10 2v-1c0-7.168 5.832-13 13-13h2.359l-1.98.565c-5.523 1.579-9.379 6.692-9.379 12.435v1h2l-4 5.333-4-5.333z"
                fill={color}
              ></path>
            </svg>
          </g>
        </svg>
      ) : (
        <svg
          id="SvgjsSvg1021"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs id="SvgjsDefs1022"></defs>
          <g id="SvgjsG1023">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 64 64"
              viewBox="0 0 64 64"
              width={width}
              height={height}
            >
              <path
                d="m21.138 33.652c-1.359-.424-2.747-.652-4.138-.652-7.72 0-14 6.28-14 14 0 3.38 1.204 6.484 3.206 8.905.739-3.816 3.458-6.925 7.041-8.232-1.368-1.1-2.247-2.785-2.247-4.673 0-3.309 2.691-6 6-6s6 2.691 6 6c0 1.888-.879 3.573-2.246 4.674 3.583 1.307 6.301 4.415 7.041 8.232 2.001-2.422 3.205-5.526 3.205-8.906 0-1.391-.228-2.779-.652-4.138-4.742-.719-8.491-4.468-9.21-9.21z"
                fill={color}
              ></path>
              <path
                d="m22.569 50.943-.768 6.907-4.801-3.599-4.801 3.6-.768-6.907c-2.018 1.595-3.333 4.032-3.417 6.778 2.434 2.042 5.567 3.278 8.986 3.278s6.552-1.236 8.986-3.279c-.085-2.746-1.4-5.182-3.417-6.778z"
                fill={color}
              ></path>
              <path
                d="m15.558 52.831-2.198-2.637.441 3.955z"
                fill={color}
              ></path>
              <circle cx="17" cy="43" r="4" fill={color}></circle>
              <path
                d="M15.134 49.197l1.866 2.241 1.866-2.24c-.602-.128-1.226-.198-1.866-.198s-1.264.07-1.866.197zM20.64 50.194l-2.198 2.637 1.757 1.318zM47 3c-7.72 0-14 6.28-14 14 0 1.391.228 2.779.652 4.138 1.38.209 2.675.671 3.838 1.344 1.307-2.248 3.355-3.94 5.75-4.813-1.364-1.101-2.24-2.784-2.24-4.669 0-3.309 2.691-6 6-6s6 2.691 6 6c0 1.888-.879 3.573-2.246 4.674 3.583 1.307 6.301 4.415 7.041 8.232 2.001-2.422 3.205-5.526 3.205-8.906 0-7.72-6.28-14-14-14z"
                fill={color}
              ></path>
              <path
                d="m45.025 19.244c.122.987.956 1.756 1.975 1.756 1.025 0 1.863-.779 1.977-1.774-.637-.144-1.297-.226-1.977-.226-.676 0-1.333.098-1.975.244z"
                fill={color}
              ></path>
              <path
                d="m39.144 23.653c1.958 1.679 3.314 4.031 3.718 6.695 1.359.424 2.747.652 4.138.652 3.419 0 6.552-1.236 8.986-3.279-.106-3.449-2.158-6.408-5.096-7.825-.334 1.449-1.456 2.589-2.89 2.961v6.143h-2v-6.142c-1.434-.373-2.556-1.513-2.89-2.962-1.66.798-3.049 2.104-3.966 3.757z"
                fill="#434af9"
              ></path>
              <circle cx="47" cy="13" r="4" fill={color}></circle>
              <path
                d="M41 32c0-4.963-4.037-9-9-9s-9 4.037-9 9 4.037 9 9 9 9-4.037 9-9zm-10-1h2c1.654 0 3 1.346 3 3v3h-3v2h-2v-2c-1.654 0-3-1.346-3-3h2c0 .552.448 1 1 1h3v-1c0-.552-.448-1-1-1h-2c-1.654 0-3-1.346-3-3v-3h3v-2h2v2c1.654 0 3 1.346 3 3h-2c0-.552-.448-1-1-1h-3v1c0 .552.448 1 1 1zM45 45h3c0 5.327-3.531 10.009-8.654 11.472l-5.346 1.528v1h6c7.732 0 14-6.268 14-14h3l-6-8zM19 19h-3c0-5.327 3.531-10.009 8.654-11.472l5.346-1.528v-1h-6c-7.732 0-14 6.268-14 14h-3l6 8z"
                fill={color}
              ></path>
            </svg>
          </g>
        </svg>
      )}
    </>
  );
};

export default LendBorrowSvgIcon;
