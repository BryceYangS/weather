package board.dto.personal;

import lombok.Data;

@Data
public class IntDstDto {
	private String intDstId;
	private String intDstName;
	private float cntLat;
	private float cntLon;
	private int zoomLvl;
	private char deletedYn;
	private float intStnDstBottomLat;
	private float intStnDstTopLat;
	private float intStnDstRightLon;
	private float intStnDstLeftLon;
}
