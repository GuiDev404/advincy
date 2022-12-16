import { getNumberRandom } from ".";

export const api = {
  gift: {
    list: function () {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            resolve({
              data: JSON.parse(localStorage.getItem("regalos")) || [],
              ok: true,
              message: "Lista regalos obtenidos satisfactoriamente.",
            });
          }, getNumberRandom(1000, 2500));
        } catch (error) {
          reject({
            data: null,
            ok: false,
            message: error?.message ?? "No se pudo recuperar los regalos.",
          });
        }
      });
    },
    save: function (newRegalos) {
      return new Promise((resolve, reject) => {
        try {
          // setTimeout(() => {
            localStorage.setItem("regalos", JSON.stringify(newRegalos));

            resolve({
              ok: true,
              message: "Regalos actualizados.",
            });
          // }, getNumberRandom(500, 1000));
        } catch (error) {
          reject({
            ok: false,
            message: error?.message ?? "Regalos no actualizados.",
          });
        }
      });
    },
  },
};
