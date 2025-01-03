import React from "react";

const OrdersDummy = () => {
  const generateDummyData = (count) => {
    const data = {};
    const statuses = ["success", "shipping", "pending"];
    const locations = [
      "JL Batutulis, 16133",
      "JL Cipaku, 21882",
      "JL Tajur, 1223",
    ];
    function makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    }
    const getRandomDate = (start, end) => {
      const startDate = new Date(start).getTime();
      const endDate = new Date(end).getTime();
      const randomTime = new Date(
        startDate + Math.random() * (endDate - startDate)
      );
      return randomTime.toISOString().slice(0, 16); // Mengambil format YYYY-MM-DDTHH:mm
    };

    for (let i = 1; i <= count; i++) {
      const id = `o${i}`;
      data[id] = {
        created_at: getRandomDate("2023-01-01", "2025-01-01"),
        id_order: makeid(9),
        id_product: i % 2 == 0 ? "Phfdjc23" : "Xhfddfs3",
        id_user: i % 2 == 0 ? "U8sfjcs" : "idZ1LAM",
        location_client:
          locations[Math.floor(Math.random() * locations.length)],
        recipient_name: 1 % 2 == 0 ? "Budi" : "Abdul",
        payment_method: i % 2 === 0 ? "cod" : "transfer",
        order_note: "-",
        qty: Math.floor(Math.random() * 10) + 1,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        token: makeid(25),
        total: Math.floor(Math.random() * 100000) + 20000,
      };
    }

    return data;
  };
  const dataDummy = generateDummyData(100);
  return <pre>{JSON.stringify(dataDummy, null, 2)}</pre>;
};

export default OrdersDummy;
