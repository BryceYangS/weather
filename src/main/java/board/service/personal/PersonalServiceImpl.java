package board.service.personal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import board.dto.personal.IntDstDto;
import board.mapper.personal.PersonalMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class PersonalServiceImpl implements PersonalService {
	
	@Autowired
	private PersonalMapper personalMapper;
	
	@Override
	public List<IntDstDto> selectIntDstList() throws Exception {
		return personalMapper.selectIntDstList();
	}

	@Override
	public void insertIntDst(IntDstDto intDst) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateIntDst(IntDstDto intDst) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public IntDstDto selectIntDstDetail(String intDstId) throws Exception {
		return personalMapper.selectIntDstDetail(intDstId);
	}

	@Override
	public void deleteIntDst(String intDstId) throws Exception {
		// TODO Auto-generated method stub

	}

}
