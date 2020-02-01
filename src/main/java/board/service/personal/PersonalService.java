package board.service.personal;

import java.util.List;

import board.dto.personal.IntDstDto;

public interface PersonalService {
	List<IntDstDto> selectIntDstList() throws Exception;
	void insertIntDst(IntDstDto intDst) throws Exception;
	void updateIntDst(IntDstDto intDst) throws Exception;
	IntDstDto selectIntDstDetail(String intDstId) throws Exception;
	void deleteIntDst(String intDstId) throws Exception;
}
