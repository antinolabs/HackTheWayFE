export const COMPLETED_AUCTION_COLUMNS = [
  {
    label: "#",
    style: "column_serial",
  },
    {
      label: "Auction ID.",
      style: "column-large",
    },
    {
      label: "Item Name",
      style: "column-small",
    },
    {
      label: "Item Description",
      style: "column-xxl",
    },
  
    {
      label: "Owner",
      style: "column-xl",
    },
    {
      label: "Start Date & Time",
      style: "column-xl",
    },
    {
      label: "End Date & Time",
      style: "column-xl",
    },
  
    {
      label: "Base Price",
      style: "column-xl",
    },
    {
      label: "Highest Bid",
      style: "column-xl",
    },

  ];
export const UPCOMING_AUCTION_COLUMNS = [
  {
    label: "#",
    style: "column_serial",
  },
    {
      label: "Auction ID.",
      style: "column-large",
    },
    {
      label: "Item Name",
      style: "column-small",
    },
    {
      label: "Item Description",
      style: "column-xxl",
    },
  
    {
      label: "Owner",
      style: "column-xl",
    },
    {
      label: "Auction Start Date",
      style: "column-xl",
    },
 
    {
      label: "Base Price",
      style: "column-xl",
    },
 

  ];
export const LIVE_AUCTION_COLUMNS = [
  {
    label: "#",
    style: "column_serial",
  },
    {
      label: "Auction ID.",
      style: "column-large",
    },
    {
      label: "Item Name",
      style: "column-small",
    },
    {
      label: "Item Description",
      style: "column-xxl",
    },
  
    {
      label: "Owner",
      style: "column-xl",
    },
    {
      label: "Auction Start Date",
      style: "column-xl",
    },
   
    {
      label: "Base Price",
      style: "column-xl",
    },
    {
      label: "Current Highest Bid",
      style: "column-xl",
    },

  ];

  export const AuctionCloumn = {
    COMPLETED_AUCTION_COLUMNS:COMPLETED_AUCTION_COLUMNS,
    UPCOMING_AUCTION_COLUMNS:UPCOMING_AUCTION_COLUMNS,
    LIVE_AUCTION_COLUMNS:LIVE_AUCTION_COLUMNS
  };
  export const TABS = {
    UPCOMING: "Upcoming",
    LIVE: "Live",
    COMPLETED: "Completed",
  };
  