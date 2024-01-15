const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    return date.toLocaleString();
  } else {
    return date?.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
};

export default formatDate;
