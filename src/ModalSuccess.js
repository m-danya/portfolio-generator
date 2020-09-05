import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#f00", "#0f0", "#00f"]
};

function ModalSuccess(props) {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => { setOpen(true); }}
        open={open}
      >
        <Modal.Header style={{ fontSize: '25px', }}>Портфолио готово! 🥳</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <p>
              <a href={props.link} download='a.pdf' >Нажмите, чтобы скачать pdf</a>
            </p>
            <div>

              <p>
                Не забудьте удалить файл с сервера, если он вам больше не нужен. <br />

            Сейчас в папке {props.warningFolderName} находится файлов: {props.warningCount}
              </p>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Закрыть
        </Button>

        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ModalSuccess