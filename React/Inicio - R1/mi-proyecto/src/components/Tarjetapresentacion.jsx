const user = {
  name: 'John Pork',
  profesion: 'Musico',
  imageUrl: 'https://i.scdn.co/image/ab67616d00001e02ffe8ad517ca19e5e1edf2ff3',
  imageSize: 120,
};

export default function Tarjeta() {
  return (
    <>
      <h1 className="nombre">{user.name}</h1>
      <h2 className="profesion">{user.profesion}</h2>
      <img
        className="tarjeta"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}

