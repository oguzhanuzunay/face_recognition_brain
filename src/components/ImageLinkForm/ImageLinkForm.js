import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3">
        {'This Magic Brain will detect faces in your pictures. Git  it a try '}
      </p>
      <div className="center">
        <div className="center form pa4 ">
          <input
            type="text"
            className="f4 pa2 w-70 center "
            onChange={(e) => onInputChange(e.target.value)}
          />
          <button
            className="w-30 f4 link ph3 pv2 dib grow  white bg-light-purple"
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
