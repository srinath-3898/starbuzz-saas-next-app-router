import React from "react";

const CampaignsIcon = ({ activeNavlink }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.3356 6.03074C21.2775 6.04478 18.9261 6.84454 16.1101 7.80798L10.9903 9.55978L8.95818 9.58087C6.62923 9.60501 6.50403 9.62331 5.61845 10.069C5.20739 10.2759 5.04508 10.3993 4.57722 10.8609C3.99704 11.4334 3.71191 11.8513 3.41845 12.5596C2.56633 14.616 3.04485 17.0807 4.58778 18.5822C5.39028 19.3632 6.50994 19.8277 7.58965 19.8277H7.79698V22.5834C7.79698 25.227 7.80125 25.3477 7.90175 25.5498C7.95939 25.6657 8.0895 25.8156 8.19089 25.8829C8.36671 25.9998 8.41347 26.0051 9.20325 25.9979C10.1261 25.9895 10.2984 25.9452 10.5031 25.6635C10.6666 25.4385 10.6702 24.9263 10.5097 24.715C10.3485 24.5027 10.1112 24.3845 9.77847 24.3507L9.486 24.3211V22.0744V19.8277H10.2162H10.9465L16.0882 21.5898C18.9162 22.559 21.3828 23.3762 21.5696 23.4058C22.7156 23.5878 23.918 22.8912 24.4815 21.719C24.8384 20.9763 24.8192 21.376 24.8192 14.6981C24.8192 9.0979 24.8125 8.63732 24.7263 8.32488C24.4207 7.21714 23.579 6.31872 22.6093 6.06525C22.3515 5.99789 21.5604 5.97644 21.3356 6.03074ZM28.6195 6.66795C28.4743 6.72568 28.0356 6.91848 27.6445 7.09641C26.8834 7.44274 26.7325 7.57284 26.6615 7.9443C26.6128 8.19913 26.7646 8.55328 26.997 8.72733C27.1519 8.84329 27.2395 8.86863 27.4806 8.86717C27.7309 8.86572 27.901 8.80945 28.6153 8.49224C29.0775 8.28701 29.5132 8.06628 29.5836 8.00177C29.9913 7.62798 29.9459 7.04112 29.4832 6.70474C29.2803 6.55723 28.935 6.54256 28.6195 6.66795ZM22.2795 7.70078C22.5206 7.79078 22.8221 8.11037 22.9775 8.44084L23.1302 8.76531V14.6981V20.6309L22.9822 20.9417C22.8206 21.2811 22.5836 21.5537 22.3422 21.6777C22.0013 21.8529 21.8734 21.8184 18.2742 20.5825C16.3873 19.9345 14.1843 19.179 13.3787 18.9036L11.9141 18.4028L11.9152 14.6981L11.9163 10.9933L16.7843 9.32604C21.7472 7.62632 21.9327 7.57139 22.2795 7.70078ZM10.2121 14.711L10.2257 18.1697H8.80744C8.02737 18.1697 7.26129 18.1459 7.10506 18.1168C5.58478 17.8337 4.48834 16.0393 4.72338 14.2188C4.84377 13.2863 5.16347 12.6117 5.76144 12.0287C6.50102 11.3076 6.79745 11.2303 8.77345 11.2432L10.1986 11.2524L10.2121 14.711ZM14.1308 13.2364C13.7126 13.4608 13.6262 13.8035 13.6653 15.0811C13.6843 15.6997 13.7051 15.8486 13.7935 15.9971C14.126 16.5559 14.9274 16.5538 15.2628 15.9933C15.3624 15.8268 15.3712 15.7278 15.3712 14.7758C15.3712 13.626 15.3465 13.5216 15.0206 13.2938C14.7885 13.1316 14.3757 13.105 14.1308 13.2364ZM27.1295 13.9708C26.5693 14.2205 26.4963 14.9845 26.9969 15.3596L27.1858 15.5012L28.2535 15.5171C29.4607 15.535 29.5896 15.5088 29.8331 15.1955C30.1372 14.804 30.012 14.2297 29.5696 13.9867C29.3715 13.878 29.2962 13.8708 28.3556 13.871C27.4798 13.8713 27.3244 13.8839 27.1295 13.9708ZM27.2208 20.5387C26.8535 20.6742 26.6069 21.0873 26.6652 21.4695C26.7213 21.8362 26.9489 22.0087 27.9597 22.4505C28.4596 22.669 28.9044 22.8316 29.0039 22.8321C29.7339 22.8358 30.1285 21.9733 29.6324 21.4581C29.5122 21.3333 29.2059 21.1712 28.5629 20.8923C27.7032 20.5194 27.4524 20.4533 27.2208 20.5387Z"
        fill={activeNavlink === "campaigns" ? "#FFFFFF" : "#070127"}
      />
    </svg>
  );
};

export default CampaignsIcon;